<?php
session_start();

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

try {
    // Open SQLite database connection
    $conn = new PDO("sqlite:$databaseFile");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement to fetch user details
    $sql = "SELECT FName AS firstname, LName AS lastname, Phone AS phone, Email AS email FROM Customer WHERE Username = :username";

    // Prepare and execute statement
    $stmt = $conn->prepare($sql);
    $stmt->execute([':username' => $_SESSION['username']]); // Assuming you have a session variable storing the username

    // Fetch user details
    $userDetails = $stmt->fetch(PDO::FETCH_ASSOC);

    // Close statement and connection
    $stmt = null;
    $conn = null;

    // Return user details as JSON response
    header('Content-Type: application/json');
    echo json_encode($userDetails);
} catch(PDOException $e) {
    // Display error message
    echo json_encode(['error' => $e->getMessage()]);
}
?>
