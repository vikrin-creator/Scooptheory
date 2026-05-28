<?php
// ─────────────────────────────────────────────
// DATABASE CONFIGURATION — Scoop Theory
// ─────────────────────────────────────────────
define('DB_HOST', 'localhost');
define('DB_NAME', 'u177524058_scooptheory');
define('DB_USER', 'u177524058_scooptheory');
define('DB_PASS', 'Devima@0812');

/**
 * Returns a PDO database connection.
 */
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]
        );
    }
    return $pdo;
}

/**
 * Set CORS + JSON headers. Handles OPTIONS preflight.
 */
function setCORSHeaders(): void {
    // Allow your React frontend (change to your exact domain in production)
    $allowed = [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://scoop-theory.com',
        'https://www.scoop-theory.com',
        'https://gray-gerbil-641296.hostingersite.com',
    ];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        header('Access-Control-Allow-Origin: *');
    }
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

/**
 * Send a JSON response and exit.
 */
function jsonResponse(mixed $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

/**
 * Read and decode the incoming JSON request body.
 */
function getRequestBody(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}
