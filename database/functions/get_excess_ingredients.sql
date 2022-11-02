CREATE OR REPLACE FUNCTION get_excess_ingredients(start_date date)
RETURNS TABLE (ingr_name varchar, stock numeric)
LANGUAGE plpgsql
AS
    $$
        BEGIN
           RETURN QUERY SELECT ingredient_name, quantity FROM ingredients WHERE get_ingredient_diff(ingredient_name, start_date) <= 10;
        END;
    $$;