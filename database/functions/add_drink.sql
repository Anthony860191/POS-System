CREATE OR REPLACE FUNCTION add_drink(dtype varchar)
RETURNS VOID
LANGUAGE plpgsql
AS
$$
BEGIN
    INSERT INTO drinks(drink_type)
    VALUES(dtype);
END
$$;