CREATE TRIGGER update_inventory
    AFTER INSERT ON pizzas
    FOR EACH ROW
    EXECUTE FUNCTION update_ingredients();