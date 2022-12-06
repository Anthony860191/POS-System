CREATE OR REPLACE FUNCTION get_excess_ingredients(start_date date, base_limit numeric default 10.0)
RETURNS TABLE (ingr_name varchar, stock numeric, percentage_used numeric, amount_now numeric)
LANGUAGE plpgsql
AS
    $$
        BEGIN
           RETURN QUERY SELECT ingredient_name, get_starting_amount(ingredient_name, start_date), get_ingredient_diff(ingredient_name, start_date), quantity as amount_now FROM ingredients WHERE get_ingredient_diff(ingredient_name, start_date) <= base_limit;
        END;
    $$;