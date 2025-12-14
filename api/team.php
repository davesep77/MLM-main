<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

$id = $_GET['id'] ?? '';
$action = $_GET['action'] ?? 'direct'; // 'direct' or 'genealogy'

if (empty($id)) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit();
}

try {
    if ($action === 'direct') {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE sponsor_id = ?");
        $stmt->execute([$id]);
        $team = $stmt->fetchAll();

        $data = [];
        foreach ($team as $idx => $member) {
            $data[] = [
                'id' => (string)($idx + 1),
                'slNo' => $idx + 1,
                'userId' => $member['id'],
                'name' => $member['name'],
                'country' => $member['country'],
                'contact' => $member['phone'],
                'email' => $member['email'],
                'position' => $member['position'],
                'totalActive' => 0, // Placeholder
                'totalPurchase' => 0, // Placeholder
                'joinDate' => $member['joined_at']
            ];
        }
        echo json_encode(['success' => true, 'data' => $data]);
    } 
    elseif ($action === 'genealogy') {
        // Simplified Genealogy: Just return current user and immediate 2 children
        $stmtUser = $pdo->prepare("SELECT id, name, status FROM users WHERE id = ?");
        $stmtUser->execute([$id]);
        $root = $stmtUser->fetch();

        if (!$root) {
             echo json_encode(['success' => false, 'message' => 'User not found']);
             exit();
        }

        $stmtChildren = $pdo->prepare("SELECT id, name, status FROM users WHERE sponsor_id = ?");
        $stmtChildren->execute([$id]);
        $children = $stmtChildren->fetchAll();

        $childNodes = [];
        foreach ($children as $child) {
            $childNodes[] = [
                'id' => $child['id'],
                'name' => $child['name'],
                'status' => strtolower($child['status']),
                'children' => [
                    ['id' => 'NANA', 'name' => 'Join here', 'status' => 'open'],
                    ['id' => 'NANA', 'name' => 'Join here', 'status' => 'open']
                ]
            ];
        }
        
        // Fill up to 2 children
        while (count($childNodes) < 2) {
             $childNodes[] = ['id' => 'NANA', 'name' => 'Join here', 'status' => 'open'];
        }

        $tree = [
            'id' => $root['id'],
            'name' => $root['name'],
            'status' => strtolower($root['status']),
            'children' => $childNodes
        ];

        echo json_encode(['success' => true, 'data' => $tree]);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
?>
