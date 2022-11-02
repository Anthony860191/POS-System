CREATE OR REPLACE VIEW full_pizza_view AS
    SELECT pizzas.*, order_date
    FROM pizzas
    INNER JOIN orders o on o.id = pizzas.orderid;
SELECT * FROM grant_permissions_to_table('full_pizza_view');