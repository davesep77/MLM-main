/*
  # Add login lookup function

  1. New Functions
    - `get_email_by_username` - Securely looks up email by username for authentication
  
  2. Security
    - Function is available to anonymous users
    - Only returns email, no other sensitive data
    - Used for username-based login flow
*/

CREATE OR REPLACE FUNCTION get_email_by_username(p_username text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_email text;
BEGIN
  SELECT email INTO v_email
  FROM user_profiles
  WHERE username = p_username;
  
  RETURN v_email;
END;
$$;
