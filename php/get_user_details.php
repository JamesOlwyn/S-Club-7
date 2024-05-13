<?php
session_start(); // Start the session

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
    header('Content-Type: application/json'); // Set the response content type to JSON
    echo json_encode($userDetails); // Encode user details as JSON and echo
} catch(PDOException $e) {
    // Handle database connection error
    echo json_encode(['error' => $e->getMessage()]); // Encode error message as JSON and echo
}
?>

