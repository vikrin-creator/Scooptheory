<?php
// ─────────────────────────────────────────────
// REVIEWS API  —  /api/reviews.php
// ─────────────────────────────────────────────
// GET    → fetch all reviews
// POST   → add new review     { name, review_text, rating, featured, review_date }
// PUT    → update review      { id, featured, ... }
// DELETE → delete review      ?id=123
// ─────────────────────────────────────────────
require_once __DIR__ . '/config.php';

setCORSHeaders();

try {
    $db     = getDB();
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        // ── GET all reviews ───────────────────
        case 'GET':
            $stmt = $db->query(
                "SELECT id, name, review_text AS text, rating, featured,
                        DATE_FORMAT(review_date, '%Y-%m-%d') AS date
                 FROM reviews
                 ORDER BY featured DESC, review_date DESC"
            );
            $rows = $stmt->fetchAll();
            foreach ($rows as &$row) {
                $row['id']       = (int)$row['id'];
                $row['rating']   = (int)$row['rating'];
                $row['featured'] = (bool)$row['featured'];
            }
            jsonResponse($rows);

        // ── POST new review ───────────────────
        case 'POST':
            $body = getRequestBody();
            if (empty($body['name']) || empty($body['text'])) {
                jsonResponse(['error' => 'name and text are required'], 400);
            }
            $stmt = $db->prepare(
                "INSERT INTO reviews (name, review_text, rating, featured, review_date)
                 VALUES (:name, :text, :rating, :featured, :review_date)"
            );
            $stmt->execute([
                ':name'        => trim($body['name']),
                ':text'        => trim($body['text']),
                ':rating'      => max(1, min(5, (int)($body['rating'] ?? 5))),
                ':featured'    => $body['featured'] ? 1 : 0,
                ':review_date' => $body['date'] ?? date('Y-m-d'),
            ]);
            $id  = (int)$db->lastInsertId();
            $row = $db->query(
                "SELECT id, name, review_text AS text, rating, featured,
                        DATE_FORMAT(review_date,'%Y-%m-%d') AS date
                 FROM reviews WHERE id = $id"
            )->fetch();
            $row['id']       = (int)$row['id'];
            $row['rating']   = (int)$row['rating'];
            $row['featured'] = (bool)$row['featured'];
            jsonResponse($row, 201);

        // ── PUT update (e.g., toggle featured) ─
        case 'PUT':
            $body = getRequestBody();
            $id   = (int)($body['id'] ?? 0);
            if (!$id) jsonResponse(['error' => 'id required'], 400);

            // Build dynamic SET clause so we only update provided fields
            $fields = [];
            $params = [':id' => $id];
            if (isset($body['featured'])) {
                $fields[] = 'featured = :featured';
                $params[':featured'] = $body['featured'] ? 1 : 0;
            }
            if (isset($body['text'])) {
                $fields[] = 'review_text = :text';
                $params[':text'] = trim($body['text']);
            }
            if (isset($body['rating'])) {
                $fields[] = 'rating = :rating';
                $params[':rating'] = max(1, min(5, (int)$body['rating']));
            }
            if (empty($fields)) jsonResponse(['error' => 'No fields to update'], 400);

            $stmt = $db->prepare("UPDATE reviews SET " . implode(', ', $fields) . " WHERE id = :id");
            $stmt->execute($params);

            $row = $db->query(
                "SELECT id, name, review_text AS text, rating, featured,
                        DATE_FORMAT(review_date,'%Y-%m-%d') AS date
                 FROM reviews WHERE id = $id"
            )->fetch();
            $row['id']       = (int)$row['id'];
            $row['rating']   = (int)$row['rating'];
            $row['featured'] = (bool)$row['featured'];
            jsonResponse($row);

        // ── DELETE ────────────────────────────
        case 'DELETE':
            $id = (int)($_GET['id'] ?? 0);
            if (!$id) jsonResponse(['error' => 'id param required'], 400);
            $stmt = $db->prepare("DELETE FROM reviews WHERE id = :id");
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
