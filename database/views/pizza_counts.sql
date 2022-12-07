CREATE OR REPLACE VIEW pizza_counts AS
SELECT pizza_type, COUNT(*) as amount_purchased from full_pizza_view
WHERE order_date BETWEEN
NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7
AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
GROUP BY pizza_type;
