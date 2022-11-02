CREATE TABLE IF NOT EXISTS Orders
(
    id serial primary key,
    order_date date,
    price numeric,
    payment_type varchar,
    customer_name varchar
);

SELECT * FROM grant_permissions_to_table('Orders');
GRANT USAGE, SELECT ON SEQUENCE orders_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE orders_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE orders_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE orders_id_seq TO csce315_904_hillis;