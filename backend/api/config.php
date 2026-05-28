<?php
// ─────────────────────────────────────────────
// DATABASE CONFIGURATION — Scoop Theory
// ─────────────────────────────────────────────
define('DB_HOST', 'localhost');
define('DB_NAME', 'u177524058_scooptheory');
define('DB_USER', 'u177524058_scooptheory');
define('DB_PASS', 'Devima@0812');

/**
 * Returns a PDO database connection or a MockPDO JSON database fallback.
 */
function getDB(): PDO|MockPDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
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
        } catch (PDOException $e) {
            // seamless fallback to server JSON database if MySQL is not working
            $pdo = new MockPDO();
        }
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

// ─────────────────────────────────────────────
// Drop-in MockPDO and MockPDOStatement Fallback
// ─────────────────────────────────────────────

class MockPDO {
    private $dbFile;
    private $lastInsertId = 0;

    public function __construct() {
        $this->dbFile = __DIR__ . '/database.json';
        if (!file_exists($this->dbFile)) {
            $this->initDefaultDatabase();
        }
    }

    private function initDefaultDatabase() {
        $data = [
            'menu_items' => [],
            'reviews' => [],
            'messages' => [],
            'settings' => []
        ];
        $data['settings'][] = ['setting_key' => 'name', 'setting_value' => 'Scoop Theory'];
        $data['settings'][] = ['setting_key' => 'address', 'setting_value' => '129 S Livingston Ave, Livingston NJ - 07039'];
        $data['settings'][] = ['setting_key' => 'phone', 'setting_value' => '(201) 687-1228'];
        $data['settings'][] = ['setting_key' => 'email', 'setting_value' => 'info@scoop-theory.com'];
        $data['settings'][] = ['setting_key' => 'capacity', 'setting_value' => '70'];
        $data['settings'][] = ['setting_key' => 'hours', 'setting_value' => '{"monWed":"2PM - 9PM","thurs":"2PM - 9:30PM","friSat":"1PM - 10PM","sun":"1PM - 9:30PM"}'];
        $data['settings'][] = ['setting_key' => 'social', 'setting_value' => '{"instagram":"https://www.instagram.com/scoop.theory","facebook":"https://www.facebook.com/share/1D5q63g5DV/","tiktok":"https://www.tiktok.com/@scoop.theory"}'];
        
        $this->writeData($data);
    }

    public function readData() {
        if (!file_exists($this->dbFile)) {
            $this->initDefaultDatabase();
        }
        return json_decode(file_get_contents($this->dbFile), true) ?: [];
    }

    public function writeData($data) {
        file_put_contents($this->dbFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    public function query($sql) {
        return new MockPDOStatement($this, $sql);
    }

    public function prepare($sql) {
        return new MockPDOStatement($this, $sql);
    }

    public function lastInsertId() {
        return $this->lastInsertId;
    }

    public function setLastInsertId($id) {
        $this->lastInsertId = $id;
    }

    public function exec($sql) {
        $this->seedSampleData();
        return 1;
    }

    private function seedSampleData() {
        $data = $this->readData();
        if (empty($data['menu_items'])) {
            $data['menu_items'] = [
                ['id' => 1, 'name' => 'Pistachio', 'description' => 'Pistachios Chunk Infused Ice Cream', 'badge' => 'Egg and Gluten Free', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 1],
                ['id' => 2, 'name' => 'Butterscotch', 'description' => 'Classic butterscotch ice cream with rich, caramelized flavor', 'badge' => 'Egg and Gluten Free', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 2],
                ['id' => 3, 'name' => 'Vanilla Bourbon', 'description' => 'Infused with Pure Madagascar Bourbon vanilla', 'badge' => 'Egg and Gluten Free', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 3],
                ['id' => 4, 'name' => 'BlueBerry Crisp', 'description' => 'Layered with Homemade Blueberry Jam and Graham Cracker Crisps', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 4],
                ['id' => 5, 'name' => 'Tiramisu', 'description' => 'Coco, Coffee and Cream Cheese Infused Ice Cream Layered With Lady Fingers And Fudge', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 5],
                ['id' => 6, 'name' => 'Hazelnut Rocks', 'description' => 'Hazelnut infused Ice Cream with Chocolate crisps and crushed Hazelnuts', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 6],
                ['id' => 7, 'name' => 'Ube Brownie', 'description' => 'Ube Infused Ice Cream Layered with Homemade Brownie Pieces', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 7],
                ['id' => 8, 'name' => 'Salted Caramel & Cookies', 'description' => 'Salt Infused Ice Cream Layered with Swirls of Caramel & Vanilla Cookies', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 8],
                ['id' => 9, 'name' => 'Cookies & Cream', 'description' => 'Oreo Infused Ice Cream With Chocolate Chip Cookies, Finished With Swirls Of Fudge', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 9],
                ['id' => 10, 'name' => 'Kulfi', 'description' => 'Saffron Infused Ice Cream With Almond, Pistachio & Cardamom Powder', 'badge' => 'Egg and Gluten Free', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 10],
                ['id' => 11, 'name' => 'Mango', 'description' => 'Fresh Mango with Chunks', 'badge' => 'Egg and Gluten Free', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 11],
                ['id' => 12, 'name' => 'Mint Chocolate Chip', 'description' => 'Mint Infused Ice Cream layered with Dark Chocolate Chips', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 12],
                ['id' => 13, 'name' => 'FALOODA', 'description' => 'Basil seeds, Vermicelli noodles Saffron and Rose Petals Infused Ice Cream', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 13],
                ['id' => 14, 'name' => 'Masala Chai', 'description' => 'Chai Tea Infused with Cinnamon, Black Pepper, Nutmeg, Fennel and Ginger', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 14],
                ['id' => 15, 'name' => 'Strawberry Lychee', 'description' => 'Lychee Strawberry Ice Cream Infused With Lychee Pieces', 'badge' => 'Egg and Gluten Free', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 15],
                ['id' => 16, 'name' => 'Black Sesame', 'description' => 'Roasted Black Sesame Infused Ice Cream', 'badge' => 'Egg and Gluten Free', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 16],
                ['id' => 17, 'name' => 'Vegan Coconut Choco', 'description' => 'Dairy-Free Ice Cream Made with Plant-Based Milk and Infused with real Cocoa And Coconut Flakes', 'badge' => 'Egg and Gluten Free', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 17],
                ['id' => 18, 'name' => 'Dubai Chocolate', 'description' => 'Rich chocolate infused with pistachio cream and kataifi pastry', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 18],
                ['id' => 19, 'name' => 'Strawberry ShortCake', 'description' => 'Home made yellow Cake Layered with Strawberry Infused Ice Cream', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 19],
                ['id' => 20, 'name' => 'Peanut Butter Cup', 'description' => 'Peanut Infused Ice Cream Layered with Peanut Butter & Homemade Chocolate Shell', 'badge' => '', 'category' => 'Ice Cream', 'active' => 1, 'sort_order' => 20],
                ['id' => 21, 'name' => 'Signature Milkshakes', 'description' => 'Salted Caramel Pretzels, Dubai Chocolate, Chocolate Raspberry, Nutella, Midnight Cookies and Cream, Peanut Butter', 'badge' => '', 'category' => 'Drinks', 'active' => 1, 'sort_order' => 21],
                ['id' => 22, 'name' => 'Matcha & Hot Drinks', 'description' => 'Expresso Coffee, Hot Chocolate, Expresso Latte, Taro Latte, UBE Matcha, Mango Matcha, Strawberry Matcha Latte, Biscoff Matcha', 'badge' => '', 'category' => 'Drinks', 'active' => 1, 'sort_order' => 22],
                ['id' => 23, 'name' => 'Theory Refreshers', 'description' => 'Tropican Fizz, Indigo Fizz, Sunset Dragon, Guava Fizz, Rasberry Wave, Pink Lychee Fizz, Mango Wave, Citrus Tea, Ocean Bliss, Passion Raz', 'badge' => '', 'category' => 'Drinks', 'active' => 1, 'sort_order' => 23],
                ['id' => 24, 'name' => 'Bubble Waffle', 'description' => 'Hong Kong style crispy bubble waffles served with ice cream scoops', 'badge' => '', 'category' => 'Specialty', 'active' => 1, 'sort_order' => 24]
            ];
            $data['reviews'] = [
                ['id' => 1, 'name' => 'Indrayani T', 'text' => 'Thank you for bringing the ice cream in bubble waffle style to Livingston! The plethora of flavours, different cone styles, beautiful ambience, and super friendly staff: makes it a must try spot for all year around!', 'rating' => 5, 'featured' => 1, 'date' => '2025-01-15'],
                ['id' => 2, 'name' => 'Sarath Patibandla', 'text' => 'One of the best desserts I\'ve ever had. The bubble waffle was warm, crisp on the outside, and fluffy inside — the perfect contrast to the cold ice cream. And the drizzle of chocolate sauce on top? Pure magic.', 'rating' => 5, 'featured' => 1, 'date' => '2025-01-10'],
                ['id' => 3, 'name' => 'D Pat', 'text' => 'This ice cream shop is a hidden gem with a sleek, modern space and a menu full of handcrafted, small-batch flavors that are anything but ordinary.', 'rating' => 5, 'featured' => 0, 'date' => '2024-12-20'],
                ['id' => 4, 'name' => 'Jeffrey Nadeau', 'text' => 'Loved the shop and owner. Was so kind and nice. Explained to us how he made the ice cream and they were ALL delicious. Very distinct flavors! Got the Black Sesame and Strawberry with Lychee ice cream. Definitely come here for a treat!', 'rating' => 5, 'featured' => 0, 'date' => '2024-12-01'],
                ['id' => 5, 'name' => 'Michael Scott', 'text' => 'Owner was super friendly when we arrived, offered samples of a bunch of flavors too! Very unique in house made flavors. Vegan and gluten free options too! Highly recommend.', 'rating' => 5, 'featured' => 0, 'date' => '2024-11-20']
            ];
            $this->writeData($data);
        }
    }
}

class MockPDOStatement {
    private $pdo;
    private $sql;
    private $results = [];
    private $pointer = 0;

    public function __construct($pdo, $sql) {
        $this->pdo = $pdo;
        $this->sql = $sql;
    }

    public function execute($params = []) {
        $data = $this->pdo->readData();
        
        // ── INSERT INTO menu_items ──
        if (preg_match('/INSERT INTO\s+menu_items/i', $this->sql)) {
            $newId = count($data['menu_items']) ? max(array_column($data['menu_items'], 'id')) + 1 : 1;
            $newItem = [
                'id' => $newId,
                'name' => $params[':name'] ?? '',
                'description' => $params[':description'] ?? '',
                'badge' => $params[':badge'] ?? '',
                'category' => $params[':category'] ?? 'Ice Cream',
                'active' => (int)($params[':active'] ?? 1),
                'sort_order' => (int)($params[':sort_order'] ?? 0)
            ];
            $data['menu_items'][] = $newItem;
            $this->pdo->writeData($data);
            $this->pdo->setLastInsertId($newId);
            return true;
        }

        // ── UPDATE menu_items ──
        if (preg_match('/UPDATE\s+menu_items/i', $this->sql)) {
            $id = (int)($params[':id'] ?? 0);
            foreach ($data['menu_items'] as &$item) {
                if ($item['id'] === $id) {
                    $item['name'] = $params[':name'] ?? $item['name'];
                    $item['description'] = $params[':description'] ?? $item['description'];
                    $item['badge'] = $params[':badge'] ?? $item['badge'];
                    $item['category'] = $params[':category'] ?? $item['category'];
                    $item['active'] = (int)($params[':active'] ?? $item['active']);
                    $item['sort_order'] = (int)($params[':sort_order'] ?? $item['sort_order']);
                }
            }
            $this->pdo->writeData($data);
            return true;
        }

        // ── DELETE FROM menu_items ──
        if (preg_match('/DELETE FROM\s+menu_items/i', $this->sql)) {
            $id = (int)($params[':id'] ?? 0);
            $data['menu_items'] = array_values(array_filter($data['menu_items'], function($i) use ($id) { return $i['id'] !== $id; }));
            $this->pdo->writeData($data);
            return true;
        }

        // ── INSERT INTO reviews ──
        if (preg_match('/INSERT INTO\s+reviews/i', $this->sql)) {
            $newId = count($data['reviews']) ? max(array_column($data['reviews'], 'id')) + 1 : 1;
            $newItem = [
                'id' => $newId,
                'name' => $params[':name'] ?? '',
                'text' => $params[':text'] ?? '',
                'rating' => (int)($params[':rating'] ?? 5),
                'featured' => (int)($params[':featured'] ?? 0),
                'date' => $params[':date'] ?? date('Y-m-d')
            ];
            $data['reviews'][] = $newItem;
            $this->pdo->writeData($data);
            $this->pdo->setLastInsertId($newId);
            return true;
        }

        // ── UPDATE reviews (Featured flag) ──
        if (preg_match('/UPDATE\s+reviews/i', $this->sql)) {
            $id = (int)($params[':id'] ?? 0);
            foreach ($data['reviews'] as &$item) {
                if ($item['id'] === $id) {
                    $item['featured'] = (int)($params[':featured'] ?? $item['featured']);
                }
            }
            $this->pdo->writeData($data);
            return true;
        }

        // ── DELETE FROM reviews ──
        if (preg_match('/DELETE FROM\s+reviews/i', $this->sql)) {
            $id = (int)($params[':id'] ?? 0);
            $data['reviews'] = array_values(array_filter($data['reviews'], function($r) use ($id) { return $r['id'] !== $id; }));
            $this->pdo->writeData($data);
            return true;
        }

        // ── INSERT INTO messages ──
        if (preg_match('/INSERT INTO\s+messages/i', $this->sql)) {
            $newId = count($data['messages']) ? max(array_column($data['messages'], 'id')) + 1 : 1;
            $newItem = [
                'id' => $newId,
                'name' => $params[':name'] ?? '',
                'email' => $params[':email'] ?? '',
                'message' => $params[':message'] ?? '',
                'read' => 0,
                'is_read' => 0,
                'date' => date('Y-m-d')
            ];
            $data['messages'][] = $newItem;
            $this->pdo->writeData($data);
            $this->pdo->setLastInsertId($newId);
            return true;
        }

        // ── UPDATE messages (Read flag) ──
        if (preg_match('/UPDATE\s+messages/i', $this->sql)) {
            $id = (int)($params[':id'] ?? 0);
            foreach ($data['messages'] as &$item) {
                if ($item['id'] === $id) {
                    $item['read'] = 1;
                    $item['is_read'] = 1;
                }
            }
            $this->pdo->writeData($data);
            return true;
        }

        // ── DELETE FROM messages ──
        if (preg_match('/DELETE FROM\s+messages/i', $this->sql)) {
            $id = (int)($params[':id'] ?? 0);
            $data['messages'] = array_values(array_filter($data['messages'], function($m) use ($id) { return $m['id'] !== $id; }));
            $this->pdo->writeData($data);
            return true;
        }

        // ── UPDATE settings ──
        if (preg_match('/INSERT INTO\s+settings|UPDATE\s+settings/i', $this->sql)) {
            $key = $params[':key'] ?? '';
            $value = $params[':value'] ?? '';
            $found = false;
            foreach ($data['settings'] as &$item) {
                if ($item['setting_key'] === $key) {
                    $item['setting_value'] = $value;
                    $found = true;
                }
            }
            if (!$found && $key !== '') {
                $data['settings'][] = ['setting_key' => $key, 'setting_value' => $value];
            }
            $this->pdo->writeData($data);
            return true;
        }

        return true;
    }

    public function fetchAll() {
        $data = $this->pdo->readData();
        
        if (preg_match('/FROM\s+menu_items/i', $this->sql)) {
            $res = $data['menu_items'];
            usort($res, function($a, $b) {
                return ($a['sort_order'] <=> $b['sort_order']) ?: ($a['id'] <=> $b['id']);
            });
            return $res;
        }
        
        if (preg_match('/FROM\s+reviews/i', $this->sql)) {
            $res = $data['reviews'];
            usort($res, function($a, $b) {
                return $b['id'] <=> $a['id'];
            });
            return $res;
        }

        if (preg_match('/FROM\s+messages/i', $this->sql)) {
            $res = $data['messages'];
            usort($res, function($a, $b) {
                return $b['id'] <=> $a['id'];
            });
            return $res;
        }

        if (preg_match('/FROM\s+settings/i', $this->sql)) {
            return $data['settings'];
        }

        return [];
    }

    public function fetch() {
        $data = $this->pdo->readData();
        
        if (preg_match('/FROM\s+menu_items\s+WHERE\s+id\s*=\s*(\d+)/i', $this->sql, $matches)) {
            $id = (int)$matches[1];
            foreach ($data['menu_items'] as $item) {
                if ($item['id'] === $id) return $item;
            }
        }

        if (preg_match('/FROM\s+reviews\s+WHERE\s+id\s*=\s*(\d+)/i', $this->sql, $matches)) {
            $id = (int)$matches[1];
            foreach ($data['reviews'] as $item) {
                if ($item['id'] === $id) return $item;
            }
        }

        return false;
    }
}
