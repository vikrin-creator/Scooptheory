<?php
if (function_exists('opcache_invalidate')) {
    opcache_invalidate(__DIR__ . '/config.php', true);
}
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $db = getDB();
    
    // Read SQL file
    $sqlFile = __DIR__ . '/setup.sql';
    if (!file_exists($sqlFile)) {
        throw new Exception("setup.sql file not found!");
    }
    
    $sql = file_get_contents($sqlFile);
    
    // Execute SQL queries
    $db->exec($sql);
    
    echo json_encode([
        "success" => true,
        "message" => "🎉 Database tables created and seeded successfully!"
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database Setup Failed: " . $e->getMessage()
    ]);
}
