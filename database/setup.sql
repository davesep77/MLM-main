-- Database Creation
DROP DATABASE IF EXISTS evolentra;

CREATE DATABASE evolentra;

USE evolentra;

-- Users Table
CREATE TABLE users (
    id VARCHAR(20) PRIMARY KEY, -- Using VARCHAR to match 'TAI...' format
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(50),
    sponsor_id VARCHAR(20),
    wallet_address VARCHAR(100),
    image_url TEXT,
    password_hash VARCHAR(255) DEFAULT '123456', -- Default for testing
    transaction_password_hash VARCHAR(255) DEFAULT '123456',
    position ENUM('Left', 'Right') DEFAULT 'Left',
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sponsor_id) REFERENCES users (id) ON DELETE SET NULL
);

-- Wallets Table
CREATE TABLE wallets (
    user_id VARCHAR(20) PRIMARY KEY,
    deposit_balance DECIMAL(15, 2) DEFAULT 0.00,
    bot_earning_balance DECIMAL(15, 2) DEFAULT 0.00,
    network_earning_balance DECIMAL(15, 2) DEFAULT 0.00,
    trayd_ai_balance DECIMAL(15, 2) DEFAULT 0.00,
    compounding_balance DECIMAL(15, 2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Ranks Table
CREATE TABLE ranks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image_url TEXT,
    min_business DECIMAL(15, 2) DEFAULT 0,
    reward_amount DECIMAL(15, 2) DEFAULT 0
);

-- Packages (Products) Table
CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    min_amount DECIMAL(15, 2) NOT NULL,
    max_amount DECIMAL(15, 2) NOT NULL,
    roi_min DECIMAL(5, 2),
    roi_max DECIMAL(5, 2),
    duration_days INT,
    bot_image TEXT
);

-- User Packages (Investments)
CREATE TABLE user_packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    package_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME,
    status ENUM(
        'Active',
        'Completed',
        'Terminated'
    ) DEFAULT 'Active',
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (package_id) REFERENCES packages (id)
);

-- Transactions/History Table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    type VARCHAR(50) NOT NULL, -- e.g., 'Deposit', 'Withdrawal', 'ROI', 'Referral', 'Binary'
    wallet_type VARCHAR(50), -- e.g., 'Deposit Wallet', 'Bot Wallet'
    description TEXT,
    status ENUM(
        'Pending',
        'Success',
        'Failed',
        'Approved',
        'Rejected'
    ) DEFAULT 'Success',
    transaction_reference VARCHAR(100), -- External TXID
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Support Tickets
CREATE TABLE support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    subject VARCHAR(200),
    message TEXT,
    status ENUM('Open', 'Closed', 'Pending') DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- SEED DATA -----------------------------------------------------------

-- 1. Insert Packages
INSERT INTO
    packages (
        name,
        min_amount,
        max_amount,
        roi_min,
        roi_max,
        duration_days
    )
VALUES (
        'Evolentra AI',
        50,
        5000,
        1.4,
        1.8,
        140
    ),
    (
        'SmartBot',
        5001,
        35000,
        1.7,
        2.3,
        140
    ),
    (
        'GeniusBot',
        35001,
        1000000,
        2.2,
        3.0,
        140
    );

-- 2. Insert Ranks
INSERT INTO
    ranks (name, image_url)
VALUES (
        'Rank 1',
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300'
    ),
    (
        'Rank 2',
        'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=300'
    ),
    (
        'Bronze',
        'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=300'
    );

-- 3. Insert Admin User (Root)
INSERT INTO
    users (
        id,
        username,
        name,
        email,
        phone,
        country,
        wallet_address,
        image_url
    )
VALUES (
        'TAI768273',
        'Gebeyehu',
        'Gebeyehu Lanteyderu',
        'gebeyehuasefa42@gmail.com',
        '0911771387',
        'Ethiopia',
        'TGAC9ea1EGT3eDJxjayH6nwYDMyaTBCR62',
        'https://img.freepik.com/free-vector/cute-robot-wearing-hat-flying-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5186.jpg'
    );

-- 4. Insert Downline Users
INSERT INTO
    users (
        id,
        username,
        name,
        email,
        phone,
        country,
        sponsor_id,
        position,
        status
    )
VALUES (
        'TAI116799',
        'Melaku',
        'Melaku Mandefro',
        'dreamyourhigherness@gmail.com',
        '0777078866',
        'Ethiopia',
        'TAI768273',
        'Right',
        'Active'
    ),
    (
        'TAI483984',
        'Mak',
        'Mak Nahi',
        'nahiasee@gmail.com',
        '251915947494',
        'Ethiopia',
        'TAI768273',
        'Left',
        'Inactive'
    );

-- 5. Insert Wallets for Users
INSERT INTO
    wallets (
        user_id,
        deposit_balance,
        bot_earning_balance,
        network_earning_balance,
        trayd_ai_balance,
        compounding_balance
    )
VALUES (
        'TAI768273',
        500.00,
        125.50,
        75.00,
        1000.00,
        50.00
    ),
    (
        'TAI116799',
        0.00,
        0.00,
        0.00,
        0.00,
        0.00
    ),
    (
        'TAI483984',
        0.00,
        0.00,
        0.00,
        0.00,
        0.00
    );

-- 6. Insert Mock Transactions
INSERT INTO
    transactions (
        user_id,
        amount,
        type,
        wallet_type,
        description,
        status
    )
VALUES (
        'TAI768273',
        93.00,
        'Deposit',
        'Deposit Wallet',
        'Initial Deposit',
        'Success'
    ),
    (
        'TAI768273',
        1.47,
        'ROI',
        'Bot Earning Wallet',
        'Daily Trading Profit',
        'Success'
    );