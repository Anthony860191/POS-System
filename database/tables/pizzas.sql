
CREATE TABLE IF NOT EXISTS Pizzas
(
  id SERIAL PRIMARY KEY,
  orderid int REFERENCES Orders(id),
  pizza_type varchar,
  cheese_type varchar,
  crust varchar,
  sauce varchar,
  drizzle varchar,
  drink varchar,
  topping1 varchar REFERENCES Ingredients(ingredient_name),
  topping2 varchar REFERENCES Ingredients(ingredient_name),
  topping3 varchar REFERENCES Ingredients(ingredient_name),
  topping4 varchar REFERENCES Ingredients(ingredient_name),
  price numeric
);
TRUNCATE TABLE pizzas;
SELECT * FROM grant_permissions_to_table('Pizzas');
GRANT USAGE, SELECT ON SEQUENCE pizzas_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE pizzas_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE pizzas_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE pizzas_id_seq TO csce315_904_hillis;
