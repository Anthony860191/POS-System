SELECT MAX(id) FROM orders;

-- Then run...
-- This should be higher than the last result.
SELECT nextval('orders_id_seq');

-- If it's not higher... run this set the sequence last to your highest id.
-- (wise to run a quick pg_dump first...)

BEGIN;
-- protect against concurrent inserts while you update the counter
LOCK TABLE orders IN EXCLUSIVE MODE;
-- Update the sequence
SELECT setval('orders_id_seq', COALESCE((SELECT MAX(id)+1 FROM orders), 1), false);
COMMIT;

SELECT MAX(id) FROM pizzas;

-- Then run...
-- This should be higher than the last result.
SELECT nextval('pizzas_id_seq');

-- If it's not higher... run this set the sequence last to your highest id.
-- (wise to run a quick pg_dump first...)

BEGIN;
-- protect against concurrent inserts while you update the counter
LOCK TABLE pizzas IN EXCLUSIVE MODE;
-- Update the sequence
SELECT setval('pizzas_id_seq', COALESCE((SELECT MAX(id)+1 FROM pizzas), 1), false);
COMMIT;