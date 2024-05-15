<?php
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Retrieve CustID from POST request
$custID = isset($_POST['CustID']) ? $_POST['CustID'] : null;

if (!$custID) {
    http_response_code(400);
    echo json_encode(['error' => 'CustID not provided']);
    exit;
}

try {
    // Connect to SQLite database
    $db = new PDO('sqlite:' . $databaseFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement to delete user
    $query = "DELETE FROM Customer WHERE CustID = :custID";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':custID', $custID);
    
    // Execute SQL statement
    if ($stmt->execute()) {
        // Return success message
        echo json_encode(['message' => 'User deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete user']);
    }
} catch (PDOException $e) {
    // Handle database connection error
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
