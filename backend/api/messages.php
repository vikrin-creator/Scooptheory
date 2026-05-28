<?php
// ─────────────────────────────────────────────
// MESSAGES API  —  /api/messages.php
// ─────────────────────────────────────────────
// GET    → fetch all messages (admin)
// POST   → create new message from contact form  { name, email, message }
// PUT    → mark as read                           { id }
// DELETE → delete message                         ?id=123
// ─────────────────────────────────────────────
require_once __DIR__ . '/config.php';

setCORSHeaders();

try {
    $db     = getDB();
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        // ── GET all messages ──────────────────
        case 'GET':
            $stmt = $db->query(
                "SELECT id, name, email, message, is_read,
                        DATE_FORMAT(created_at, '%Y-%m-%d') AS date
                 FROM messages
                 ORDER BY created_at DESC"
            );
            $rows = $stmt->fetchAll();
            foreach ($rows as &$row) {
                $row['id']      = (int)$row['id'];
                $row['is_read'] = (bool)$row['is_read'];
                // alias for frontend compatibility
                $row['read']    = $row['is_read'];
            }
            jsonResponse($rows);

        // ── POST new message ──────────────────
        case 'POST':
            $body = getRequestBody();
            if (empty($body['name']) || empty($body['email']) || empty($body['message'])) {
                jsonResponse(['error' => 'name, email and message are required'], 400);
            }
            // Basic sanitisation
            $name    = htmlspecialchars(trim($body['name']), ENT_QUOTES, 'UTF-8');
            $email   = filter_var(trim($body['email']), FILTER_SANITIZE_EMAIL);
            $message = htmlspecialchars(trim($body['message']), ENT_QUOTES, 'UTF-8');

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                jsonResponse(['error' => 'Invalid email address'], 400);
            }

            $stmt = $db->prepare(
                "INSERT INTO messages (name, email, message) VALUES (:name, :email, :message)"
            );
            $stmt->execute([':name' => $name, ':email' => $email, ':message' => $message]);
            $id = (int)$db->lastInsertId();
            jsonResponse(['success' => true, 'id' => $id], 201);

        // ── PUT mark as read ──────────────────
        case 'PUT':
            $body = getRequestBody();
            $id   = (int)($body['id'] ?? 0);
            if (!$id) jsonResponse(['error' => 'id required'], 400);
            $stmt = $db->prepare("UPDATE messages SET is_read = 1 WHERE id = :id");
            $stmt->execute([':id' => $id]);
            jsonResponse(['success' => true]);

        // ── DELETE ────────────────────────────
        case 'DELETE':
            $id = (int)($_GET['id'] ?? 0);
            if (!$id) jsonResponse(['error' => 'id param required'], 400);
            $stmt = $db->prepare("DELETE FROM messages WHERE id = :id");
            $stmt->execute([':id' => $id]);
            jsonResponse(['success' => true, 'deleted_id' => $id]);

        default:
            jsonResponse(['error' => 'Method not allowed'], 405);
    }

} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
} catch (Throwable $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}
