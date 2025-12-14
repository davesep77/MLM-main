/*
  # Add automatic wallet creation trigger

  1. New Functions
    - `create_wallet_for_new_user` - Automatically creates a wallet when a user profile is created
  
  2. New Triggers
    - Trigger on user_profiles table to create wallet after insert
  
  3. Purpose
    - Ensures every new user automatically gets a wallet
    - Prevents login issues from missing wallet records
*/

CREATE OR REPLACE FUNCTION create_wallet_for_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO wallets (
    user_id,
    deposit_balance,
    bot_earning_balance,
    network_earning_balance,
    trayd_ai_balance,
    compounding_balance
  )
  VALUES (
    NEW.id,
    0,
    0,
    0,
    0,
    0
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_create_wallet_for_new_user ON user_profiles;

CREATE TRIGGER trigger_create_wallet_for_new_user
  AFTER INSERT ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_wallet_for_new_user();
