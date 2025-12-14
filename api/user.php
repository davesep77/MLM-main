<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

$id = $_GET['id'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // We expect ID to be passed in body for update, or use the GET param if available/consistent
    $userId = $data['id'] ?? $id; 
    
    if (empty($userId)) {
        echo json_encode(['success' => false, 'message' => 'User ID required for update']);
        exit();
    }

    // Build update query dynamically
    $updates = [];
    $params = [];
    
    if (isset($data['name'])) { $updates[] = "name = ?"; $params[] = $data['name']; }
    if (isset($data['phone'])) { $updates[] = "phone = ?"; $params[] = $data['phone']; }
    if (isset($data['email'])) { $updates[] = "email = ?"; $params[] = $data['email']; }
    if (isset($data['country'])) { $updates[] = "country = ?"; $params[] = $data['country']; }
    if (isset($data['walletAddress'])) { $updates[] = "wallet_address = ?"; $params[] = $data['walletAddress']; }
    
    // Password Updates
    if (isset($data['password']) && !empty($data['password'])) {
        $updates[] = "password_hash = ?";
        $params[] = password_hash($data['password'], PASSWORD_DEFAULT);
    }
    
    if (isset($data['transactionPassword']) && !empty($data['transactionPassword'])) {
        $updates[] = "transaction_password_hash = ?";
        $params[] = password_hash($data['transactionPassword'], PASSWORD_DEFAULT);
    }
    
    // Image Upload Handling
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $fileExt = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $allowed = ['jpg', 'jpeg', 'png', 'gif'];
        
        if (in_array($fileExt, $allowed)) {
            $newFileName = 'profile_' . $userId . '_' . time() . '.' . $fileExt;
            $destPath = $uploadDir . $newFileName;
            
            if (move_uploaded_file($_FILES['image']['tmp_name'], $destPath)) {
                // Update DB with full URL
                $imageUrl = 'http://localhost/MLM-main/uploads/' . $newFileName;
                $updates[] = "image_url = ?";
                $params[] = $imageUrl;
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
                exit();
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid file type']);
            exit();
        }
    }

    if (empty($updates)) {
        echo json_encode(['success' => true, 'message' => 'No changes provided']);
        exit();
    }
    
    $params[] = $userId;
    
    $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE id = ?";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Update failed: ' . $e->getMessage()]);
    }
    exit();
}

if (empty($id)) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $user = $stmt->fetch();

    if ($user) {
        unset($user['password_hash']);
        unset($user['transaction_password_hash']);
        
        // Find sponsor name
        $sponsorName = 'None';
        if ($user['sponsor_id']) {
            $stmtSponsor = $pdo->prepare("SELECT name FROM users WHERE id = ?");
            $stmtSponsor->execute([$user['sponsor_id']]);
            $sponsor = $stmtSponsor->fetch();
            if ($sponsor) $sponsorName = $sponsor['name'];
        }

        echo json_encode([
            'success' => true,
            'data' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'name' => $user['name'],
                'email' => $user['email'],
                'phone' => $user['phone'],
                'country' => $user['country'],
                'sponsorId' => $user['sponsor_id'],
                'sponsorName' => $sponsorName,
                'walletAddress' => $user['wallet_address'],
                'image' => $user['image_url']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
