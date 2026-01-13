-- Migration: Add first_name and last_name columns to users table
-- Date: 2025-01-20
-- Description: Split name field into first_name and last_name for better email personalization

-- Add the new columns
ALTER TABLE users
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Optional: If you have existing data in a 'name' column, split it
-- Uncomment the following if you want to migrate existing 'name' data:
-- UPDATE users
-- SET
--   first_name = SPLIT_PART(name, ' ', 1),
--   last_name = CASE
--     WHEN SPLIT_PART(name, ' ', 2) != '' THEN SPLIT_PART(name, ' ', 2)
--     ELSE ''
--   END
-- WHERE name IS NOT NULL AND name != '';

-- Optional: Drop the old 'name' column if you no longer need it
-- ALTER TABLE users DROP COLUMN IF EXISTS name;

-- Verify the changes
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name IN ('first_name', 'last_name');
