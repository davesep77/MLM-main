<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM packages");
    $packages = $stmt->fetchAll();

    $data = [];
    foreach ($packages as $p) {
        $data[] = [
            'id' => (string)$p['id'],
            'slNo' => $p['id'], // using ID as slNo
            'packageId' => 'PKG' . str_pad($p['id'], 6, '0', STR_PAD_LEFT),
            // The frontend PurchaseHistoryItem mismatch: 'startDate', 'endDate' are for user_packages, not packages.
            // But this endpoint might be for 'PackageViews' to list available packages, 
            // OR for 'purchases' history.
            // Let's assume this is for listing available packages for purchase logic, 
            // OR we can make this fetch purchase history if 'user_id' is present.
        ];
    }
    
    // For now, let's make this return PURCHASE history if 'id' is present (user_packages),
    // and available packages if not.
    
    $userId = $_GET['id'] ?? '';
    
    if ($userId) {
        // Fetch User Purchases
        $stmtPurchases = $pdo->prepare("
            SELECT up.*, p.name as package_name, p.bot_image 
            FROM user_packages up 
            JOIN packages p ON up.package_id = p.id 
            WHERE up.user_id = ?
        ");
        $stmtPurchases->execute([$userId]);
        $purchases = $stmtPurchases->fetchAll();
        
        $purchaseData = [];
        foreach ($purchases as $idx => $pur) {
            $purchaseData[] = [
                'id' => (string)$pur['id'],
                'slNo' => $idx + 1,
                'packageId' => 'ORD' . str_pad($pur['id'], 8, '0', STR_PAD_LEFT),
                'startDate' => $pur['start_date'],
                'endDate' => $pur['end_date'],
                'packageName' => $pur['package_name'],
                'botName' => $pur['package_name'], // Assuming bot name same as package
                'amount' => (float)$pur['amount'],
                'wallet' => 'Deposit Wallet' // Placeholder
            ];
        }
         echo json_encode(['success' => true, 'data' => $purchaseData]);
    } else {
        echo json_encode(['success' => true, 'data' => $packages]);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
