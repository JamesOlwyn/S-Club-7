<?php
session_start(); // Start the session

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Get parameters from request
$menuID = $_POST['MenuID'];
$menuName = $_POST['MenuName'];
$menuDesc = $_POST['MenuDesc'];
$menuPrice = $_POST['MenuPrice'];

try {
    // Connect to SQLite database
    $db = new PDO('sqlite:' . $databaseFile);

    // Prepare and execute UPDATE query
    $query = $db->prepare('UPDATE Menu SET MenuName = ?, MenuDesc = ?, MenuPrice = ? WHERE MenuID = ?');
    $query->execute([$menuName, $menuDesc, $menuPrice, $menuID]);

    // Close database connection
    $db = null;

    // Return success response
    echo "Menu option updated successfully";
} catch (PDOException $e) {
    // Handle database connection error
    echo "Error: " . $e->getMessage();
}
?>
