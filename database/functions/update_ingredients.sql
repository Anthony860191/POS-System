CREATE OR REPLACE FUNCTION update_ingredients()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN
    IF NEW.topping1 IS NOT NULL THEN
        UPDATE ingredients
        SET quantity = quantity - usage_value
        WHERE ingredient_name = NEW.topping1;
    END IF; 
    IF NEW.topping2 IS NOT NULL  THEN
        UPDATE ingredients
        SET quantity = quantity - usage_value
        WHERE ingredient_name = NEW.topping2;
    END IF; 
    IF NEW.topping3 IS NOT NULL THEN
        UPDATE ingredients
        SET quantity = quantity - usage_value
        WHERE ingredient_name = NEW.topping3;
    END IF; 
    IF NEW.topping4 IS NOT NULL THEN
        UPDATE ingredients
        SET quantity = quantity - usage_value
        WHERE ingredient_name = NEW.topping4;
    END IF; 
    IF NEW.pizza_type = 'PEPPERONI' THEN
        UPDATE ingredients
        SET quantity = quantity - usage_value
        WHERE ingredient_name = 'PEPPERONI';
    END IF; 

    IF NEW.sauce IS NOT NULL THEN 
        UPDATE ingredients
        SET quantity = quantity - usage_value
        WHERE ingredient_name = NEW.sauce;
    END IF; 
    IF NEW.cheese_type IS NOT NULL THEN
        UPDATE ingredients
        SET quantity = quantity - ingredients.usage_value
        WHERE ingredient_name = NEW.cheese_type;
    end if;
    IF NEW.drizzle IS NOT NULL THEN
        UPDATE ingredients
        SET quantity = quantity - usage_value
        WHERE ingredient_name = NEW.drizzle;
    END IF;
    IF NEW.drink IS NOT NULL THEN
        UPDATE ingredients
        SET quantity = quantity - usage_value
        WHERE ingredient_name = NEW.drink;
    end if;
    RETURN NEW;
    END; 
$$;