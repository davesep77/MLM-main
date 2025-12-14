<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit();
}

try {
    // In a real app, use password_verify() with hashed passwords.
    // For this mock/transition, we are using simple string comparison as per setup.sql defaults.
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND password_hash = ?");
    $stmt->execute([$email, $password]);
    $user = $stmt->fetch();

    if ($user) {
        // Remove password from response
        unset($user['password_hash']);
        unset($user['transaction_password_hash']);
        
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'name' => $user['name'],
                'email' => $user['email'],
                'image' => $user['image_url'], // Map image_url to image for frontend
                'token' => 'mock-jwt-token-' . $user['id'] // Simulate JWT
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
