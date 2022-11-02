CREATE OR REPLACE FUNCTION grant_permissions_to_table(table_name varchar)
RETURNS VOID
LANGUAGE c
AS
$$
    BEGIN
        EXECUTE 'GRANT ALL ON ' || table_name || ' TO csce315_904_carver;' ;
        EXECUTE 'GRANT ALL ON ' || table_name || ' TO csce315_904_hillis;' ;
        EXECUTE 'GRANT ALL ON ' || table_name || ' TO csce315_904_mercado;' ;
        EXECUTE 'GRANT ALL ON ' || table_name || ' TO csce315_904_thorat;' ;
    END;
$$