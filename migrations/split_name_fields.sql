-- Migration: Split name field into first_name and last_name
-- Date: 2025-10-20

-- ============================================
-- 1. UPDATE email_waitlist TABLE
-- ============================================

-- Add new columns
ALTER TABLE public.email_waitlist
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT;

-- Migrate existing data (split name on first space)
-- This handles cases where name exists
UPDATE public.email_waitlist
SET
  first_name = CASE
    WHEN name IS NOT NULL AND position(' ' IN name) > 0
    THEN split_part(name, ' ', 1)
    ELSE name
  END,
  last_name = CASE
    WHEN name IS NOT NULL AND position(' ' IN name) > 0
    THEN substring(name FROM position(' ' IN name) + 1)
    ELSE NULL
  END
WHERE name IS NOT NULL;

-- Drop the old name column
ALTER TABLE public.email_waitlist
DROP COLUMN name;

-- ============================================
-- 2. UPDATE users TABLE
-- ============================================

-- Add new columns (NOT NULL with default empty string temporarily)
ALTER TABLE public.users
ADD COLUMN first_name TEXT NOT NULL DEFAULT '',
ADD COLUMN last_name TEXT NOT NULL DEFAULT '';

-- Migrate existing data (split name on first space)
UPDATE public.users
SET
  first_name = CASE
    WHEN position(' ' IN name) > 0
    THEN split_part(name, ' ', 1)
    ELSE name
  END,
  last_name = CASE
    WHEN position(' ' IN name) > 0
    THEN substring(name FROM position(' ' IN name) + 1)
    ELSE ''
  END;

-- Drop the old name column
ALTER TABLE public.users
DROP COLUMN name;

-- Optional: Remove defaults if you want to enforce non-empty values at application level
-- ALTER TABLE public.users ALTER COLUMN first_name DROP DEFAULT;
-- ALTER TABLE public.users ALTER COLUMN last_name DROP DEFAULT;

-- ============================================
-- NOTES:
-- ============================================
-- - email_waitlist: first_name and last_name are nullable (optional signup)
-- - users: first_name and last_name are NOT NULL (required for paid users)
-- - Data migration splits on first space only (preserves compound last names)
-- - Example: "John Doe Smith" becomes first_name="John", last_name="Doe Smith"
