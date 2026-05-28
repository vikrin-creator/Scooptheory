<?php
// ─────────────────────────────────────────────
// MENU ITEMS API  —  /api/menu.php
// ─────────────────────────────────────────────
// GET    → fetch all menu items
// POST   → create new item         { name, description, badge, category, active }
// PUT    → update item             { id, name, description, badge, category, active }
// DELETE → delete item             ?id=123
// ─────────────────────────────────────────────
require_once __DIR__ . '/config.php';

setCORSHeaders();

try {
    $db     = getDB();
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {

        // ── GET all items ──────────────────────
        case 'GET':
            $stmt  = $db->query("SELECT * FROM menu_items ORDER BY sort_order ASC, id ASC");
            $items = $stmt->fetchAll();
            foreach ($items as &$item) {
                $item['active'] = (bool)$item['active'];
                $item['id']     = (int)$item['id'];
            }
            jsonResponse($items);

        // ── POST create ───────────────────────
        case 'POST':
            $body = getRequestBody();
            if (empty($body['name'])) {
                jsonResponse(['error' => 'Name is required'], 400);
            }
            $stmt = $db->prepare(
                "INSERT INTO menu_items (name, description, badge, category, active, sort_order)
                 VALUES (:name, :description, :badge, :category, :active, :sort_order)"
            );
            $stmt->execute([
                ':name'        => trim($body['name']),
                ':description' => trim($body['description'] ?? ''),
                ':badge'       => trim($body['badge'] ?? ''),
                ':category'    => $body['category'] ?? 'Ice Cream',
                ':active'      => $body['active'] ? 1 : 0,
                ':sort_order'  => (int)($body['sort_order'] ?? 0),
            ]);
            $id   = (int)$db->lastInsertId();
            $item = $db->query("SELECT * FROM menu_items WHERE id = $id")->fetch();
            $item['active'] = (bool)$item['active'];
            $item['id']     = (int)$item['id'];
            jsonResponse($item, 201);

        // ── PUT update ────────────────────────
        case 'PUT':
            $body = getRequestBody();
            $id   = (int)($body['id'] ?? 0);
            if (!$id) jsonResponse(['error' => 'Item id required'], 400);

            $stmt = $db->prepare(
                "UPDATE menu_items
                 SET name=:name, description=:description, badge=:badge,
                     category=:category, active=:active, sort_order=:sort_order
                 WHERE id=:id"
            );
            $stmt->execute([
                ':name'        => trim($body['name']),
                ':description' => trim($body['description'] ?? ''),
                ':badge'       => trim($body['badge'] ?? ''),
                ':category'    => $body['category'] ?? 'Ice Cream',
                ':active'      => $body['active'] ? 1 : 0,
                ':sort_order'  => (int)($body['sort_order'] ?? 0),
                ':id'          => $id,
            ]);
            $item = $db->query("SELECT * FROM menu_items WHERE id = $id")->fetch();
            $item['active'] = (bool)$item['active'];
            $item['id']     = (int)$item['id'];
            jsonResponse($item);

        // ── DELETE ────────────────────────────
        case 'DELETE':
            $id = (int)($_GET['id'] ?? 0);
            if (!$id) jsonResponse(['error' => 'id param required'], 400);
            $stmt = $db->prepare("DELETE FROM menu_items WHERE id = :id");
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
