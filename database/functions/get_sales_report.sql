CREATE OR REPLACE FUNCTION get_sales_report(d1 date, d2 date)
    RETURNS TABLE
            (
                pizzatype varchar,
                drinktype varchar,
                crusttype varchar,
                dateoforder date,
                salescost   numeric
            )
    LANGUAGE plpgsql
AS
$$
BEGIN
    -- get pizzas sold between these two dates by date and pizza type
    RETURN QUERY
        SELECT pizza_type, drink_type, crust, order_date, SUM(price) as sales
        FROM full_pizza_view WHERE order_date >= d1 AND order_date <= d2
        GROUP BY pizza_type, order_date, drink, crust
        ORDER BY order_date, pizza_type, drink, crust;
END;
$$;