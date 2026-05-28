<?php
// ─────────────────────────────────────────────
// SETTINGS API  —  /api/settings.php
// ─────────────────────────────────────────────
// GET  → return all settings as a JSON object
// POST → bulk-upsert settings        { key: value, ... }
// ─────────────────────────────────────────────
require_once __DIR__ . '/config.php';

setCORSHeaders();

try {
    $db     = getDB();
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        // ── GET all settings ──────────────────
        case 'GET':
            $rows = $db->query("SELECT setting_key, setting_value FROM settings")->fetchAll();
            $out  = [];
            foreach ($rows as $row) {
                // Decode JSON values (for nested objects like hours/social)
                $decoded = json_decode($row['setting_value'], true);
                $out[$row['setting_key']] = ($decoded !== null) ? $decoded : $row['setting_value'];
            }
            jsonResponse($out);

        // ── POST bulk-upsert ──────────────────
        case 'POST':
            $body = getRequestBody();
            if (empty($body)) jsonResponse(['error' => 'No data provided'], 400);

            $stmt = $db->prepare(
                "INSERT INTO settings (setting_key, setting_value)
                 VALUES (:key, :value)
                 ON DUPLICATE KEY UPDATE setting_value = :value2"
            );
            foreach ($body as $key => $value) {
                $serialized = is_array($value) ? json_encode($value) : (string)$value;
                $stmt->execute([
                    ':key'    => $key,
                    ':value'  => $serialized,
                    ':value2' => $serialized,
                ]);
            }
            jsonResponse(['success' => true]);

        default:
            jsonResponse(['error' => 'Method not allowed'], 405);
    }

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
} catch (Throwable $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}
