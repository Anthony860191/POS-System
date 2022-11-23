CREATE OR REPLACE VIEW daily_sales_total AS
    select order_date, sum(price) from orders
    group by order_date
    order by  order_date; 

SELECT * FROM grant_permissions_to_table('daily_sales_total');