CREATE OR REPLACE FUNCTION get_price_of_pizza(pizzatype varchar, crusttype varchar, drinktype varchar)
RETURNS NUMERIC
LANGUAGE plpgsql
AS
    $$
    DECLARE
        current_price numeric;
    BEGIN
        current_price := 0.00;
        IF pizzatype IS NOT NULL OR pizzatype != '' THEN
            current_price := (SELECT price FROM menu WHERE pizzatype = menu_item);
        end if;
        IF crusttype IS NOT NULL OR crusttype !=  '' THEN
            current_price := current_price + (SELECT price FROM menu where crusttype = menu_item);
        end if;

        IF drinktype != '' OR drinktype IS NOT NULL THEN
            current_price := current_price +  (SELECT price FROM menu where drinktype = menu_item);
        end if;

        RETURN current_price;

    end;
    $$