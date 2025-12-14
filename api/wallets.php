<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

$id = $_GET['id'] ?? '';

if (empty($id)) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM wallets WHERE user_id = ?");
    $stmt->execute([$id]);
    $wallet = $stmt->fetch();

    if ($wallet) {
        echo json_encode([
            'success' => true,
            'data' => [
                'deposit' => (float)$wallet['deposit_balance'],
                'botEarning' => (float)$wallet['bot_earning_balance'],
                'networkEarning' => (float)$wallet['network_earning_balance'],
                'traydAi' => (float)$wallet['trayd_ai_balance'],
                'compounding' => (float)$wallet['compounding_balance']
            ]
        ]);
    } else {
        // Return zeros if no wallet record found
        echo json_encode([
            'success' => true,
            'data' => [
                'deposit' => 0,
                'botEarning' => 0,
                'networkEarning' => 0,
                'traydAi' => 0,
                'compounding' => 0
            ]
        ]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
