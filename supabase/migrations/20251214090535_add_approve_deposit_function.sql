/*
  # Add deposit approval function
  
  1. New Function
    - `approve_deposit` - Approves a deposit and updates the user's deposit wallet balance
  
  2. Functionality
    - Updates deposit status to 'Approved'
    - Sets approved_date to current timestamp
    - Increases user's deposit_balance in wallets table
    - Creates a transaction record
  
  3. Security
    - Function is SECURITY DEFINER to allow updating wallets
    - Only allows approving pending deposits
*/

CREATE OR REPLACE FUNCTION approve_deposit(deposit_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_amount numeric;
  v_status text;
BEGIN
  -- Get deposit details
  SELECT user_id, amount, status INTO v_user_id, v_amount, v_status
  FROM deposits
  WHERE id = deposit_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Deposit not found';
  END IF;
  
  IF v_status != 'Pending' THEN
    RAISE EXCEPTION 'Deposit is not pending';
  END IF;
  
  -- Update deposit status
  UPDATE deposits
  SET 
    status = 'Approved',
    approved_date = now()
  WHERE id = deposit_id;
  
  -- Update wallet balance
  UPDATE wallets
  SET deposit_balance = deposit_balance + v_amount
  WHERE user_id = v_user_id;
  
  -- Create transaction record
  INSERT INTO transactions (user_id, amount, type, wallet_type, description, status)
  VALUES (v_user_id, v_amount, 'Deposit', 'deposit', 'Deposit Approved', 'Success');
END;
$$;