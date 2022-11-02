
CREATE TABLE IF NOT EXISTS menu
(
    menu_item varchar PRIMARY KEY,
    item_type varchar,
    price     numeric,
    topping1 varchar,
    topping2 varchar,
    topping3 varchar,
    topping4 varchar,
    sauce varchar,
    drizzle varchar,
    cheese_type varchar,
    default_crust varchar

);
TRUNCATE menu;
-- all other columns except menu_item,price, and item_type are irrelevant for non-pizza items
INSERT INTO menu(menu_item, price, item_type, topping1, topping2, topping3, topping4, sauce, drizzle, cheese_type)
VALUES ('CHEESE', 6.79, 'BASE_PIZZA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ('PEPPERONI', 6.79, 'BASE_PIZZA',NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ('1 TOPPING', 7.79, 'BASE_PIZZA',NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ('2-4 TOPPING', 8.99, 'BASE_PIZZA', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ('BOTTLED DRINK', 2.45, 'DRINK', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ('FOUNTAIN DRINK', 2.45, 'DRINK', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
       ('CAULIFLOWER', 2.99, 'CRUST', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
        ('REGULAR', 0.00, 'CRUST', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
SELECT * FROM grant_permissions_to_table('menu');