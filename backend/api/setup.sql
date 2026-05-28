-- ═══════════════════════════════════════════════════════════════
--  SCOOP THEORY DATABASE SETUP
--  Run this entire file in phpMyAdmin → SQL tab
--  Database: u177524058_ScoopTheory
-- ═══════════════════════════════════════════════════════════════

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ─────────────────────────────────────────────
-- TABLE: menu_items
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `menu_items` (
  `id`          INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(200)      NOT NULL,
  `description` TEXT,
  `badge`       VARCHAR(100)      DEFAULT '',
  `category`    ENUM('Ice Cream','Drinks','Specialty') NOT NULL DEFAULT 'Ice Cream',
  `active`      TINYINT(1)        NOT NULL DEFAULT 1,
  `sort_order`  INT               NOT NULL DEFAULT 0,
  `created_at`  TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────
-- TABLE: messages
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `messages` (
  `id`         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100)  NOT NULL,
  `email`      VARCHAR(150)  NOT NULL,
  `message`    TEXT          NOT NULL,
  `is_read`    TINYINT(1)    NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────
-- TABLE: reviews
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `reviews` (
  `id`          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(100)  NOT NULL,
  `review_text` TEXT          NOT NULL,
  `rating`      TINYINT       NOT NULL DEFAULT 5,
  `featured`    TINYINT(1)    NOT NULL DEFAULT 0,
  `review_date` DATE          DEFAULT NULL,
  `created_at`  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────
-- TABLE: settings  (key-value store)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `settings` (
  `setting_key`   VARCHAR(100) NOT NULL,
  `setting_value` TEXT,
  `updated_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
--  SEED DATA
-- ═══════════════════════════════════════════════════════════════

-- ── Menu Items ──────────────────────────────────────────────────
INSERT INTO `menu_items` (`name`, `description`, `badge`, `category`, `active`, `sort_order`) VALUES
('Pistachio',              'Pistachios Chunk Infused Ice Cream',                                              'Egg and Gluten Free', 'Ice Cream', 1, 1),
('Butterscotch',           'Classic butterscotch ice cream with rich, caramelized flavor',                   'Egg and Gluten Free', 'Ice Cream', 1, 2),
('Vanilla Bourbon',        'Infused with Pure Madagascar Bourbon vanilla',                                    'Egg and Gluten Free', 'Ice Cream', 1, 3),
('BlueBerry Crisp',        'Layered with Homemade Blueberry Jam and Graham Cracker Crisps',                  '', 'Ice Cream', 1, 4),
('Tiramisu',               'Coco, Coffee and Cream Cheese Infused Ice Cream Layered With Lady Fingers And Fudge', '', 'Ice Cream', 1, 5),
('Hazelnut Rocks',         'Hazelnut infused Ice Cream with Chocolate crisps and crushed Hazelnuts',         '', 'Ice Cream', 1, 6),
('Ube Brownie',            'Ube Infused Ice Cream Layered with Homemade Brownie Pieces',                     '', 'Ice Cream', 1, 7),
('Salted Caramel & Cookies','Salt Infused Ice Cream Layered with Swirls of Caramel & Vanilla Cookies',      '', 'Ice Cream', 1, 8),
('Cookies & Cream',        'Oreo Infused Ice Cream With Chocolate Chip Cookies, Finished With Swirls Of Fudge', '', 'Ice Cream', 1, 9),
('Kulfi',                  'Saffron Infused Ice Cream With Almond, Pistachio & Cardamom Powder',             'Egg and Gluten Free', 'Ice Cream', 1, 10),
('Mango',                  'Fresh Mango with Chunks',                                                         'Egg and Gluten Free', 'Ice Cream', 1, 11),
('Mint Chocolate Chip',    'Mint Infused Ice Cream layered with Dark Chocolate Chips',                       '', 'Ice Cream', 1, 12),
('FALOODA',                'Basil seeds, Vermicelli noodles Saffron and Rose Petals Infused Ice Cream',      '', 'Ice Cream', 1, 13),
('Masala Chai',            'Chai Tea Infused with Cinnamon, Black Pepper, Nutmeg, Fennel and Ginger',        '', 'Ice Cream', 1, 14),
('Strawberry Lychee',      'Lychee Strawberry Ice Cream Infused With Lychee Pieces',                        'Egg and Gluten Free', 'Ice Cream', 1, 15),
('Black Sesame',           'Roasted Black Sesame Infused Ice Cream',                                         'Egg and Gluten Free', 'Ice Cream', 1, 16),
('Vegan Coconut Choco',    'Dairy-Free Ice Cream Made with Plant-Based Milk and Infused with real Cocoa And Coconut Flakes', 'Egg and Gluten Free', 'Ice Cream', 1, 17),
('Dubai Chocolate',        'Rich chocolate infused with pistachio cream and kataifi pastry',                 '', 'Ice Cream', 1, 18),
('Strawberry ShortCake',   'Home made yellow Cake Layered with Strawberry Infused Ice Cream',               '', 'Ice Cream', 1, 19),
('Peanut Butter Cup',      'Peanut Infused Ice Cream Layered with Peanut Butter & Homemade Chocolate Shell', '', 'Ice Cream', 1, 20),
('Signature Milkshakes',   'Salted Caramel Pretzels, Dubai Chocolate, Chocolate Raspberry, Nutella, Midnight Cookies and Cream, Peanut Butter', '', 'Drinks', 1, 21),
('Matcha & Hot Drinks',    'Expresso Coffee, Hot Chocolate, Expresso Latte, Taro Latte, UBE Matcha, Mango Matcha, Strawberry Matcha Latte, Biscoff Matcha', '', 'Drinks', 1, 22),
('Theory Refreshers',      'Tropican Fizz, Indigo Fizz, Sunset Dragon, Guava Fizz, Rasberry Wave, Pink Lychee Fizz, Mango Wave, Citrus Tea, Ocean Bliss, Passion Raz', '', 'Drinks', 1, 23),
('Bubble Waffle',          'Hong Kong style crispy bubble waffles served with ice cream scoops',             '', 'Specialty', 1, 24);

-- ── Reviews ─────────────────────────────────────────────────────
INSERT INTO `reviews` (`name`, `review_text`, `rating`, `featured`, `review_date`) VALUES
('Indrayani T',
 'Thank you for bringing the ice cream in bubble waffle style to Livingston! The plethora of flavours, different cone styles, beautiful ambience, and super friendly staff: makes it a must try spot for all year around!',
 5, 1, '2025-01-15'),
('Sarath Patibandla',
 'One of the best desserts I''ve ever had. The bubble waffle was warm, crisp on the outside, and fluffy inside — the perfect contrast to the cold ice cream. And the drizzle of chocolate sauce on top? Pure magic.',
 5, 1, '2025-01-10'),
('D Pat',
 'This ice cream shop is a hidden gem with a sleek, modern space and a menu full of handcrafted, small-batch flavors that are anything but ordinary.',
 5, 0, '2024-12-20'),
('Jeffrey Nadeau',
 'Loved the shop and owner. Was so kind and nice. Explained to us how he made the ice cream and they were ALL delicious. Very distinct flavors! Got the Black Sesame and Strawberry with Lychee ice cream. Definitely come here for a treat!',
 5, 0, '2024-12-01'),
('Michael Scott',
 'Owner was super friendly when we arrived, offered samples of a bunch of flavors too! Very unique in house made flavors. Vegan and gluten free options too! Highly recommend.',
 5, 0, '2024-11-20');

-- ── Business Settings ───────────────────────────────────────────
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('name',     'Scoop Theory'),
('address',  '129 S Livingston Ave, Livingston NJ - 07039'),
('phone',    '(201) 687-1228'),
('email',    'info@scoop-theory.com'),
('capacity', '70'),
('hours',    '{"monWed":"2PM - 9PM","thurs":"2PM - 9:30PM","friSat":"1PM - 10PM","sun":"1PM - 9:30PM"}'),
('social',   '{"instagram":"https://www.instagram.com/scoop.theory","facebook":"https://www.facebook.com/share/1D5q63g5DV/","tiktok":"https://www.tiktok.com/@scoop.theory"}');

SET FOREIGN_KEY_CHECKS = 1;
