<?php
/**
 * Starblu — recebimento de leads (hospedagem compartilhada Hostinger).
 *
 * Recebe o formulário da landing page via POST (JSON ou form-urlencoded),
 * valida os campos, encaminha ao webhook do CRM e devolve JSON.
 *
 * O token do webhook fica SOMENTE aqui (lado servidor). Nunca no JavaScript.
 * Em produção pode ser sobrescrito por variável de ambiente STARBLU_LEAD_WEBHOOK.
 */

declare(strict_types=1);

const STARBLU_WEBHOOK_FALLBACK =
    'https://starblu-leads-v4.fly.dev/webhook/lead?token=3zUBXhq3E4hac_3Q0zoWUS2RfWsTXeOC';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** Resposta JSON padronizada. */
function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Método não permitido.']);
}

$raw = file_get_contents('php://input');
$input = [];

if (is_string($raw) && $raw !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

// Fallback para envio via form-urlencoded / multipart.
if ($input === [] && !empty($_POST)) {
    $input = $_POST;
}

if ($input === []) {
    respond(400, ['ok' => false, 'error' => 'Corpo da requisição vazio ou inválido.']);
}

/** Normaliza um campo de texto com limite de tamanho. */
function field(array $input, string $key, int $max): string
{
    $value = $input[$key] ?? '';
    if (!is_scalar($value)) {
        return '';
    }
    $value = trim((string) $value);
    // Remove caracteres de controle que poderiam poluir o CRM.
    $value = preg_replace('/[\x00-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr($value, 0, $max);
}

$payload = [
    'name'         => field($input, 'name', 200),
    'phone'        => field($input, 'phone', 40),
    'email'        => field($input, 'email', 200),
    'company'      => field($input, 'company', 200),
    'employees'    => field($input, 'employees', 60),
    'service'      => field($input, 'service', 120),
    'page'         => field($input, 'page', 600),
    'timestamp'    => field($input, 'timestamp', 40),
    'utm_source'   => field($input, 'utm_source', 200),
    'utm_medium'   => field($input, 'utm_medium', 200),
    'utm_campaign' => field($input, 'utm_campaign', 200),
    'utm_content'  => field($input, 'utm_content', 200),
    'utm_term'     => field($input, 'utm_term', 200),
    'gclid'        => field($input, 'gclid', 300),
    'fbclid'       => field($input, 'fbclid', 300),
];

// Validação dos campos obrigatórios.
$errors = [];
foreach (['name', 'phone', 'email', 'company'] as $required) {
    if ($payload[$required] === '') {
        $errors[] = $required;
    }
}

if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}

if (preg_match_all('/\d/', $payload['phone']) < 10) {
    $errors[] = 'phone';
}

if ($errors !== []) {
    respond(422, [
        'ok'     => false,
        'error'  => 'Campos inválidos ou incompletos.',
        'fields' => array_values(array_unique($errors)),
    ]);
}

if ($payload['timestamp'] === '') {
    $payload['timestamp'] = gmdate('c');
}

$webhook = getenv('STARBLU_LEAD_WEBHOOK');
if (!is_string($webhook) || $webhook === '') {
    $webhook = STARBLU_WEBHOOK_FALLBACK;
}

$body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if (!function_exists('curl_init')) {
    // Ambiente sem cURL: usa stream HTTP como alternativa.
    $context = stream_context_create([
        'http' => [
            'method'        => 'POST',
            'header'        => "Content-Type: application/json\r\n",
            'content'       => $body,
            'timeout'       => 15,
            'ignore_errors' => true,
        ],
    ]);
    $response = @file_get_contents($webhook, false, $context);
    $status = 0;
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
        $status = (int) $m[1];
    }
    if ($response === false || $status < 200 || $status >= 300) {
        error_log('[starblu] webhook falhou (stream) status=' . $status);
        respond(502, ['ok' => false, 'error' => 'Não foi possível registrar o lead agora.']);
    }
    respond(200, ['ok' => true]);
}

$ch = curl_init($webhook);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $body,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json', 'Accept: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_FOLLOWLOCATION => false,
]);

$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    // Log fica no servidor; o navegador recebe apenas mensagem genérica.
    error_log('[starblu] webhook falhou status=' . $status . ' erro=' . $curlError);
    respond(502, ['ok' => false, 'error' => 'Não foi possível registrar o lead agora.']);
}

respond(200, ['ok' => true]);
