<?php
session_start(); // Start the session

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

try {
    // Connect to SQLite database using PDO
    $db = new PDO('sqlite:' . $databaseFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Set error mode to exception

    // Get the raw POST data
    $rawPostData = file_get_contents('php://input');

    // Decode JSON data
    $postData = json_decode($rawPostData, true);

    // Check if MenuID is provided
    if (isset($postData['MenuID']) && is_numeric($postData['MenuID'])) {
        $menuID = intval($postData['MenuID']);

        // Prepare and execute DELETE query
        $query = $db->prepare('DELETE FROM Menu WHERE MenuID = ?');
        $query->execute([$menuID]);

        // Check if deletion was successful
        if ($query->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Menu option deleted successfully']);
        } else {
            echo json_encode(['error' => 'Failed to delete menu option or menu option does not exist']);
        }
    } else {
        // Return error response if MenuID is not provided or is not valid
        echo json_encode(['error' => 'Invalid or missing MenuID']);
    }
} catch (PDOException $e) {
    // Return error response
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} finally {
    // Close database connection
    $db = null;
}
?>
