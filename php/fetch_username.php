<?php
session_start(); // Start the session

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Get CustID from request
$custID = $_GET['custID'];

try {
    // Connect to SQLite database
    $db = new PDO('sqlite:' . $databaseFile);

    // Prepare and execute SELECT query to fetch username based on CustID
    $query = $db->prepare('SELECT Username FROM Customer WHERE CustID = :custID');
    $query->bindParam(':custID', $custID);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);

    // Close database connection
    $db = null;

    // Return username as JSON response
    echo json_encode(['username' => $result['Username']]);
} catch (PDOException $e) {
    // Handle database connection error
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>

