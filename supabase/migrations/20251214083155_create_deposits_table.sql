/*
  # Create deposits table

  1. New Tables
    - `deposits`
      - `id` (uuid, primary key) - Unique identifier for each deposit
      - `user_id` (uuid, foreign key) - Links to user_profiles.id
      - `amount` (numeric) - Deposit amount in USD
      - `coin_type` (text) - Type of cryptocurrency used (e.g., USDT.TRC20)
      - `coin_value` (numeric) - Value in the cryptocurrency
      - `status` (text) - Deposit status: Pending, Approved, Rejected
      - `transaction_reference` (text, nullable) - Transaction hash or reference
      - `applied_date` (timestamptz) - When the deposit was requested
      - `approved_date` (timestamptz, nullable) - When the deposit was approved
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `deposits` table
    - Add policy for authenticated users to read their own deposits
    - Add policy for authenticated users to insert their own deposits
    - Add policy for authenticated users to update their own deposits

  3. Indexes
    - Add index on user_id for faster queries
    - Add index on status for filtering
*/

CREATE TABLE IF NOT EXISTS deposits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount > 0),
  coin_type text NOT NULL DEFAULT 'USDT.TRC20',
  coin_value numeric NOT NULL CHECK (coin_value > 0),
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  transaction_reference text,
  applied_date timestamptz NOT NULL DEFAULT now(),
  approved_date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE deposits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own deposits"
  ON deposits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own deposits"
  ON deposits FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own deposits"
  ON deposits FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS deposits_user_id_idx ON deposits(user_id);
CREATE INDEX IF NOT EXISTS deposits_status_idx ON deposits(status);
CREATE INDEX IF NOT EXISTS deposits_applied_date_idx ON deposits(applied_date DESC);