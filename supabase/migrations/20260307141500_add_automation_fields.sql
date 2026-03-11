-- Migration: Add automation tracking fields to orders
-- This allows Make.com to update the order status and track its own processing state

-- 1. Ensure updated_at trigger exists for orders
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_orders') THEN
        CREATE TRIGGER set_updated_at_orders
        BEFORE UPDATE ON orders
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
END $$;

-- 2. Add automation-specific columns if they don't exist
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS automation_status text DEFAULT 'pending', -- 'pending', 'processed', 'failed'
ADD COLUMN IF NOT EXISTS external_metadata jsonb DEFAULT '{}';     -- For storing Make.com/Printful/Email metadata

-- 3. Add index for faster lookup by automation status
CREATE INDEX IF NOT EXISTS idx_orders_automation_status ON orders(automation_status);
