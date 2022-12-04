import faker
import pandas as pd
import random
import numpy as np
INGRS = pd.read_csv("backend/scripts/data/ingredients.csv")
MENU = pd.read_csv("backend/scripts/data/menu.csv")
# generate Pizzas
USAGE = pd.read_csv("backend/scripts/data/usage.csv")
curr_pizza_id = 200
curr_order_id = 200

"""
id          serial
        primary key,
    orderid     integer
        references orders,
    pizza_type  varchar,
    cheese_type varchar,
    crust       varchar,
    sauce       varchar,
    drizzle     varchar,
    drink       varchar,
    topping1    varchar
        references ingredients,
    topping2    varchar
        references ingredients,
    topping3    varchar
        references ingredients,
    topping4    varchar
        references ingredients,
    price       numeric
"""

ingredients = USAGE["ingr"].values
for ingr in ingredients:
    used = random.random()
    amount_used = USAGE.query("ingr == @ingr")["used"].values[0]
    per_usage = INGRS.query("ingredient_name == @ingr")["usage_value"].values[0]
    start = round(amount_used/used * per_usage)
    print(ingr, start)





