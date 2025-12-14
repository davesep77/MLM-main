<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

$id = $_GET['id'] ?? '';
$type = $_GET['type'] ?? 'trading'; // trading, referral, binary

if (empty($id)) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit();
}

try {
    // For this implementation, we will mock the REPORT logic by querying the transactions table
    // and filtering by 'type'.
    
    // Check 'type' and map to transaction 'type' column strings
    if ($type === 'trading_activity') {
        // Mock Trading Activity Data
        // Ideally this would come from a trading_logs table
        $data = [
            [
                'id' => 'TR001', 'slNo' => 1, 'date' => date('Y-m-d'), 'pair' => 'BTC/USDT',
                'low' => 64500.00, 'high' => 65200.00, 'purchasePrice' => 64800.00, 'sellingPrice' => 65100.00,
                'profitPercent' => '0.46%', 'lossPercent' => null, 'profitAmount' => 300.00, 'lossAmount' => null, 'prediction' => 'WIN'
            ],
            [
                'id' => 'TR002', 'slNo' => 2, 'date' => date('Y-m-d', strtotime('-1 day')), 'pair' => 'ETH/USDT',
                'low' => 3400.00, 'high' => 3550.00, 'purchasePrice' => 3500.00, 'sellingPrice' => 3480.00,
                'profitPercent' => null, 'lossPercent' => '0.57%', 'profitAmount' => null, 'lossAmount' => 20.00, 'prediction' => 'LOSS'
            ]
        ];
    } else {
        // Existing logic for transaction-based reports
        $dbType = '';
        if ($type === 'trading') $dbType = 'ROI';
        elseif ($type === 'referral') $dbType = 'Referral';
        elseif ($type === 'binary') $dbType = 'Binary';
        elseif ($type === 'rewards') $dbType = 'Reward';
        elseif ($type === 'upline') $dbType = 'Upline';

        $sql = "SELECT * FROM transactions WHERE user_id = ?";
        $params = [$id];
        
        if ($dbType) {
            $sql .= " AND type = ?";
            $params[] = $dbType;
        }
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $txs = $stmt->fetchAll();
        
        foreach ($txs as $idx => $t) {
            // Shape data based on report type requirements
            if ($type === 'trading') {
                 $data[] = [
                    'id' => (string)$t['id'],
                    'slNo' => $idx + 1,
                    'date' => $t['created_at'],
                    'amount' => (float)$t['amount'],
                    'description' => $t['description'],
                    'status' => $t['status']
                ];
            }
            elseif ($type === 'referral') {
                 $data[] = [
                    'id' => (string)$t['id'],
                    'slNo' => $idx + 1,
                    'date' => $t['created_at'],
                    'amount' => (float)$t['amount'],
                    'fromUser' => 'N/A', // Need join for this
                    'level' => 1,
                    'status' => $t['status']
                ];
            } 
            elseif ($type === 'upline') {
                $data[] = [
                    'id' => (string)$t['id'],
                    'slNo' => $idx + 1,
                    'date' => $t['created_at'],
                    'description' => $t['description'],
                    'amount' => (float)$t['amount'],
                    'status' => $t['status']
                ];
            }
            elseif ($type === 'rewards') {
                 $data[] = [
                    'id' => (string)$t['id'],
                    'slNo' => $idx + 1,
                    'date' => $t['created_at'],
                    'rewardName' => $t['description'],
                    'rank' => 'N/A',
                    'amount' => (float)$t['amount'],
                    'status' => $t['status']
                ];
            }
            else {
                // Default fallback (Binary, etc)
                $data[] = [
                    'id' => (string)$t['id'],
                    'slNo' => $idx + 1,
                    'date' => $t['created_at'],
                    'leftBusiness' => 0,
                    'rightBusiness' => 0,
                    'matchingAmount' => 0,
                    'amount' => (float)$t['amount'],
                    'status' => $t['status']
                ];
            }
        }
    }

    echo json_encode(['success' => true, 'data' => $data]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
