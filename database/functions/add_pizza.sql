CREATE OR REPLACE FUNCTION add_pizza(reforderid int, pizzatype varchar, cheesetype varchar, crusttype varchar, saucetype varchar,drizzletype varchar, drink varchar, to1 varchar, to2 varchar, to3 varchar, to4 varchar,
cost numeric)
RETURNS VOID
LANGUAGE plpgsql
AS
    $$
        DECLARE
            drinkidtopassin int;
        BEGIN
            IF drink IS NOT NULL THEN
                PERFORM add_drink(drink);
                drinkidtopassin := (SELECT MAX(id) FROM drinks);
            ELSE
                drinkidtopassin := NULL; 
            end if;
            INSERT INTO pizzas(orderid, pizza_type, cheese_type, crust, sauce, drizzle, drinkid, topping1, topping2, topping3, topping4, price) VALUES
            (reforderid, pizzatype, cheesetype, crusttype, saucetype, drizzletype, drinkidtopassin, to1, to2, to3, to4, cost);
        END;
    $$;