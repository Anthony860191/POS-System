drop function get_daily_sales_total(date, date);
CREATE OR REPLACE FUNCTION get_daily_sales_total(d1 date, d2 date)
    RETURNS TABLE(order_date date, sales_total numeric )
    language plpgsql
AS
    $$
    BEGIN
    RETURN QUERY select o.order_date, sum(price) from orders o
    where o.order_date >= d1 AND o.order_date <= d2
    group by o.order_date
    order by  o.order_date;
END;
$$