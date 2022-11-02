CREATE TABLE IF NOT EXISTS Ingredients
(
    ingredient_name varchar PRIMARY KEY,
    quantity numeric,
    units varchar,
    ingr_type varchar,
    usage_value numeric
);
/*
CRUST, SAUCE, MEATS, VEGGIES, CHEESE, DRIZZLE
*/
TRUNCATE TABLE ingredients;
SELECT * FROM grant_permissions_to_table('Ingredients');
