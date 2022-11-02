CREATE OR REPLACE FUNCTION get_ingredient_diff(ingr varchar, start_date date)
    RETURNS NUMERIC
    LANGUAGE plpgsql
AS
$$
DECLARE
    starting_amount numeric;
    usage_rate      numeric;
    current_amount  numeric;
BEGIN
    starting_amount := 0.00;
    current_amount := (SELECT quantity FROM ingredients WHERE ingredient_name = ingr);
    usage_rate := (SELECT usage_value FROM ingredients WHERE ingredients.ingredient_name = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND cheese_type = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND crust = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND sauce = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND drizzle = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND topping1 = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND topping2 = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND topping3 = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND topping4 = ingr);
    starting_amount := starting_amount +
                       (SELECT COUNT(*) FROM full_pizza_view WHERE order_date >= start_date AND drink = ingr);
    starting_amount := (starting_amount * usage_rate) + current_amount;
    IF starting_amount != 0 AND current_amount != 0 THEN
        RETURN (starting_amount - current_amount) / current_amount * 100.0;
    ELSIF current_amount = 0 THEN
        RETURN 100.0;
    ELSE
        RETURN 0.00;
    END IF;

END;
$$;