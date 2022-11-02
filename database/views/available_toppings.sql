CREATE OR REPLACE VIEW available_toppings AS
SELECT ingredient_name, ingr_type
FROM ingredients
WHERE quantity >= ingredients.usage_value;

SELECT * FROM grant_permissions_to_table('available_toppings');