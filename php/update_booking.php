<?php
session_start(); // Start the session

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Get parameters from request
var_dump($_POST); // Debugging statement to inspect POST data
$orderID = $_POST['OrderID'];
$orderDate = $_POST['OrderDate'];
$orderAddress = $_POST['OrderAddress'];
$adultGuests = $_POST['AdultGuests'];
$childGuests = $_POST['ChildGuests'];

try {
    // Connect to SQLite database
    $db = new PDO('sqlite:' . $databaseFile);

    // Prepare and execute UPDATE query
    $query = $db->prepare('UPDATE Orders SET OrderDate = ?, OrderAddress = ?, AdultGuests = ?, ChildGuests = ? WHERE OrderID = ?');
    $query->execute([$orderDate, $orderAddress, $adultGuests, $childGuests, $orderID]);

    // Close database connection
    $db = null;

    // Return success response
    echo "Booking updated successfully";
} catch (PDOException $e) {
    // Handle database connection error
    echo "Error: " . $e->getMessage();
}
?>
