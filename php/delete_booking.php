<?php
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Read JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (isset($input['OrderID'])) {
    try {
        // Connect to SQLite database
        $db = new PDO('sqlite:' . $databaseFile);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and execute DELETE statement
        $stmt = $db->prepare("DELETE FROM Orders WHERE OrderID = :orderID");
        $stmt->bindParam(':orderID', $input['OrderID']);
        $stmt->execute();

        // Return success message
        echo json_encode(['message' => 'Booking deleted successfully']);
    } catch (PDOException $e) {
        // Handle database error
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    // Return error if OrderID is not provided
    http_response_code(400);
    echo json_encode(['error' => 'OrderID is required']);
}
?>
