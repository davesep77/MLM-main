/*
  # Grant execute permission on approve_deposit function
  
  1. Security
    - Grant EXECUTE permission to authenticated users
    - This allows users to approve their own deposits for testing
    
  Note: In production, this should be restricted to admin users only
*/

GRANT EXECUTE ON FUNCTION approve_deposit(uuid) TO authenticated;