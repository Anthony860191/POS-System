CREATE OR REPLACE FUNCTION create_payment(
    newPaymentType varchar,
    newCustomerName varchar)
RETURNS VOID
LANGUAGE plpgsql
AS
$$
    BEGIN
        INSERT INTO payments(payment_type,customer_name) 
        VALUES (newPaymentType, newCustomerName);
    END;
$$

