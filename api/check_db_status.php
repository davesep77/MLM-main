<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = 'TAI768273'");
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(['success' => true, 'message' => 'User found', 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User NOT found', 'debug' => 'Query executed but no result']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
