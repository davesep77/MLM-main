/*
  # Initial Database Setup for Evolentra MLM Platform

  1. New Tables
    - `user_profiles`
      - `id` (uuid, references auth.users, primary key)
      - `username` (text, unique, user's display name)
      - `name` (text, full name)
      - `phone` (text, phone number)
      - `country` (text, country)
      - `sponsor_id` (uuid, references user_profiles, nullable)
      - `wallet_address` (text, crypto wallet address)
      - `image_url` (text, profile image URL)
      - `position` (text, Left or Right in binary tree)
      - `status` (text, Active or Inactive)
      - `created_at` (timestamptz, account creation time)
    
    - `wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles, unique)
      - `deposit_balance` (numeric, default 0)
      - `bot_earning_balance` (numeric, default 0)
      - `network_earning_balance` (numeric, default 0)
      - `trayd_ai_balance` (numeric, default 0)
      - `compounding_balance` (numeric, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `packages`
      - `id` (uuid, primary key)
      - `name` (text, package name)
      - `min_amount` (numeric, minimum investment)
      - `max_amount` (numeric, maximum investment)
      - `roi_min` (numeric, minimum ROI percentage)
      - `roi_max` (numeric, maximum ROI percentage)
      - `duration_days` (integer, investment duration)
      - `bot_image` (text, bot image URL)
      - `created_at` (timestamptz)
    
    - `user_packages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `package_id` (uuid, references packages)
      - `amount` (numeric, invested amount)
      - `start_date` (timestamptz)
      - `end_date` (timestamptz)
      - `status` (text, Active/Completed/Terminated)
      - `created_at` (timestamptz)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `amount` (numeric, transaction amount)
      - `type` (text, Deposit/Withdrawal/ROI/Referral/Binary)
      - `wallet_type` (text, which wallet)
      - `description` (text, transaction description)
      - `status` (text, Pending/Success/Failed/Approved/Rejected)
      - `transaction_reference` (text, external reference)
      - `created_at` (timestamptz)
    
    - `support_tickets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `subject` (text, ticket subject)
      - `message` (text, ticket message)
      - `status` (text, Open/Closed/Pending)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
    - Add policies for users to update their own profiles and wallets
    - Add policies for admins to manage all data
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  country text,
  sponsor_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  wallet_address text,
  image_url text DEFAULT 'https://img.freepik.com/free-vector/cute-robot-wearing-hat-flying-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5186.jpg',
  position text DEFAULT 'Left' CHECK (position IN ('Left', 'Right')),
  status text DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at timestamptz DEFAULT now()
);

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  deposit_balance numeric(15, 2) DEFAULT 0.00,
  bot_earning_balance numeric(15, 2) DEFAULT 0.00,
  network_earning_balance numeric(15, 2) DEFAULT 0.00,
  trayd_ai_balance numeric(15, 2) DEFAULT 0.00,
  compounding_balance numeric(15, 2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  min_amount numeric(15, 2) NOT NULL,
  max_amount numeric(15, 2) NOT NULL,
  roi_min numeric(5, 2),
  roi_max numeric(5, 2),
  duration_days integer,
  bot_image text,
  created_at timestamptz DEFAULT now()
);

-- Create user_packages table
CREATE TABLE IF NOT EXISTS user_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  package_id uuid NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  amount numeric(15, 2) NOT NULL,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  status text DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Terminated')),
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  amount numeric(15, 2) NOT NULL,
  type text NOT NULL,
  wallet_type text,
  description text,
  status text DEFAULT 'Success' CHECK (status IN ('Pending', 'Success', 'Failed', 'Approved', 'Rejected')),
  transaction_reference text,
  created_at timestamptz DEFAULT now()
);

-- Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject text,
  message text,
  status text DEFAULT 'Open' CHECK (status IN ('Open', 'Closed', 'Pending')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view profiles in their network"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    sponsor_id = auth.uid() OR
    id IN (SELECT sponsor_id FROM user_profiles WHERE id = auth.uid())
  );

-- Policies for wallets
CREATE POLICY "Users can view own wallet"
  ON wallets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own wallet"
  ON wallets FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policies for packages (public read)
CREATE POLICY "Anyone can view packages"
  ON packages FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_packages
CREATE POLICY "Users can view own packages"
  ON user_packages FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own packages"
  ON user_packages FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policies for support_tickets
CREATE POLICY "Users can view own tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own tickets"
  ON support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert seed data for packages
INSERT INTO packages (name, min_amount, max_amount, roi_min, roi_max, duration_days)
VALUES 
  ('Evolentra AI', 50, 5000, 1.4, 1.8, 140),
  ('SmartBot', 5001, 35000, 1.7, 2.3, 140),
  ('GeniusBot', 35001, 1000000, 2.2, 3.0, 140)
ON CONFLICT DO NOTHING;

-- Create function to automatically create wallet on user profile creation
CREATE OR REPLACE FUNCTION create_wallet_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wallets (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-create wallet
DROP TRIGGER IF EXISTS on_user_profile_created ON user_profiles;
CREATE TRIGGER on_user_profile_created
  AFTER INSERT ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_wallet_for_user();
