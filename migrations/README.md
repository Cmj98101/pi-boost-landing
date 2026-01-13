# Database Migration: Split Name into First Name and Last Name

## Overview

This migration splits the single `name` field into separate `first_name` and `last_name` fields in both the `email_waitlist` and `users` tables.

## Changes Made

### 1. Database Schema Changes (`split_name_fields.sql`)

**Tables Updated:**
- `email_waitlist`: Added `first_name` (nullable) and `last_name` (nullable), removed `name`
- `users`: Added `first_name` (NOT NULL), and `last_name` (NOT NULL), removed `name`

**Data Migration:**
- Existing names are automatically split on the first space
- Example: "John Doe Smith" → first_name="John", last_name="Doe Smith"
- Preserves compound last names

### 2. Frontend Changes

**Components Updated:**
- `components/Hero.tsx`: Now sends `firstName` and `lastName` separately instead of combining them
- `components/EmailCapture.tsx`: Updated all three variants (hero, footer, inline) to collect first and last name in separate fields
- `components/Footer.tsx`: No changes needed (uses EmailCapture)

### 3. API Changes

**Updated Files:**
- `app/api/email-capture/route.ts`: Now accepts and stores `firstName` and `lastName` separately

### 4. Type Definitions

**New File:**
- `types/database.ts`: Added TypeScript interfaces for `EmailWaitlist`, `User`, `EmailCaptureRequest`, and `EmailCaptureResponse`

### 5. Documentation

**Updated Files:**
- `SUPABASE_SCHEMA.md`: Updated users table schema to reflect new fields

## How to Apply This Migration

### Step 1: Run the SQL Migration

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `migrations/split_name_fields.sql`
4. Paste and execute the SQL script

**⚠️ IMPORTANT:** This migration will:
- Add new columns
- Migrate existing data automatically
- Drop the old `name` column

**Before running in production:**
- Test on a development/staging database first
- Backup your database
- Review the migration script carefully

### Step 2: Deploy Code Changes

After running the SQL migration, deploy the updated code:

```bash
# Install dependencies (if not already installed)
npm install

# Build the application
npm run build

# Deploy to your hosting platform
# (Vercel, AWS, etc.)
```

### Step 3: Verify the Migration

1. Test the email capture forms on your landing page
2. Verify that names are being split correctly in the database
3. Check that existing data was migrated properly

## Rollback Plan

If you need to rollback this migration:

```sql
-- Add name column back
ALTER TABLE public.email_waitlist ADD COLUMN name TEXT;
ALTER TABLE public.users ADD COLUMN name TEXT NOT NULL DEFAULT '';

-- Combine first_name and last_name back to name
UPDATE public.email_waitlist
SET name = CONCAT_WS(' ', first_name, last_name)
WHERE first_name IS NOT NULL OR last_name IS NOT NULL;

UPDATE public.users
SET name = CONCAT_WS(' ', first_name, last_name);

-- Remove first_name and last_name
ALTER TABLE public.email_waitlist DROP COLUMN first_name, DROP COLUMN last_name;
ALTER TABLE public.users DROP COLUMN first_name, DROP COLUMN last_name;
```

⚠️ **Note:** You'll also need to revert the code changes to restore the old behavior.

## Testing Checklist

- [ ] SQL migration runs successfully on staging database
- [ ] Existing data is migrated correctly
- [ ] Email capture form on Hero section collects first and last name
- [ ] Email capture form in Footer collects first and last name
- [ ] API endpoint accepts firstName and lastName
- [ ] Data is stored correctly in Supabase
- [ ] No TypeScript errors in the codebase
- [ ] Forms display correctly on mobile and desktop

## Questions or Issues?

If you encounter any issues with this migration, please review:
1. The SQL migration script for any syntax errors
2. Your Supabase logs for database errors
3. Browser console for frontend errors
4. API logs for backend errors
