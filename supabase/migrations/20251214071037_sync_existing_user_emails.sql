/*
  # Sync existing user emails

  1. Changes
    - Update existing user_profiles to populate email field from auth.users
    - This ensures all existing users can log in with username
  
  2. Security
    - Uses data from auth.users table which is the source of truth
    - Only updates records where email is currently null
*/

UPDATE user_profiles
SET email = auth.users.email
FROM auth.users
WHERE user_profiles.id = auth.users.id
AND user_profiles.email IS NULL;
