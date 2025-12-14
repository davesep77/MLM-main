<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

$id = $_GET['id'] ?? '';

if (empty($id)) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$id]);
    $transactions = $stmt->fetchAll();

    $data = [];
    foreach ($transactions as $idx => $t) {
        $data[] = [
            'id' => (string)$t['id'],
            'slNo' => $idx + 1,
            'date' => $t['created_at'],
            'wallet' => $t['wallet_type'],
            'incomeType' => $t['type'], // Mapping type to incomeType
            'amount' => '$' . number_format($t['amount'], 2)
        ];
    }

    echo json_encode(['success' => true, 'data' => $data]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
