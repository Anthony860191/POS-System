CREATE OR REPLACE FUNCTION create_order(newOrderDate date,
    newPrice numeric,
    newPaymentId int)
RETURNS VOID
LANGUAGE plpgsql
AS
$$
    BEGIN
        INSERT INTO orders(order_date, price, paymentid) 
        VALUES (newOrderDate, newPrice, newPaymentID);
    END;
$$
