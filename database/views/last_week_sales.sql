CREATE OR REPLACE VIEW last_week_sales AS
    SELECT sum(price) as last_week_total FROM orders
    WHERE order_date BETWEEN
    NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7
    AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER;

