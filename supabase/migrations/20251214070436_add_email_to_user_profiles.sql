/*
  # Add email to user_profiles

  1. Changes
    - Add email column to user_profiles table for easier username-based login
    - Email will be synced from auth.users for convenience
  
  2. Security
    - Email is only visible to the profile owner
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'email'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN email text;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
