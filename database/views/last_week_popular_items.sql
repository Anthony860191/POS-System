CREATE OR REPLACE VIEW last_weeks_popular_item AS
    SELECT pizza_type, COUNT(pizza_type) as items_sold FROM full_pizza_view
    WHERE order_date BETWEEN
    NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7
    AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
    GROUP BY pizza_type;