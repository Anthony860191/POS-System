CREATE OR REPLACE VIEW restock_ingredients AS
    SELECT * FROM ingredients
    WHERE quantity < ingredients.usage_value;
SELECT * FROM grant_permissions_to_table('restock_ingredients');