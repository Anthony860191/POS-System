CREATE OR REPLACE FUNCTION get_price_of_pizza(pizzatype varchar, crusttype varchar, drinktype varchar)
RETURNS NUMERIC
LANGUAGE plpgsql
AS
    $$
    DECLARE
        current_price numeric;
    BEGIN
        current_price := (SELECT price FROM menu WHERE pizzatype = menu_item);
        current_price := current_price + (SELECT price FROM menu where crusttype = menu_item);

        IF drinktype != '' OR drinktype IS NOT NULL THEN
            current_price := current_price +  (SELECT price FROM menu where drinktype = menu_item);
        end if;

        RETURN current_price;

    end;
    $$