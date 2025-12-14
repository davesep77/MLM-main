/*
  # Grant execute permission on login function

  1. Changes
    - Grant execute permission to anonymous users for get_email_by_username function
    - This allows unauthenticated users to look up email by username during login
  
  2. Security
    - Function only returns email, no other sensitive data
    - Required for username-based login flow
*/

GRANT EXECUTE ON FUNCTION get_email_by_username(text) TO anon;
GRANT EXECUTE ON FUNCTION get_email_by_username(text) TO authenticated;
