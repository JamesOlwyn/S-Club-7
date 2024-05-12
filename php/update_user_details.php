<?php
session_start();

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Check if the user is logged in (i.e., username is stored in session)
if (!isset($_SESSION['username'])) {
    // Redirect the user to the login page or handle the unauthorized access appropriately
    // For example:
    header("Location: login.php");
    exit; // Terminate script execution
}

// Validate and sanitize the updated details (similar to what you did in update_new_customer.php)

// Assuming you have received updated details in $_POST
$username = $_SESSION['username']; // Get the username from session
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$phone = $_POST['phone'];
$email = $_POST['email'];

// Update the user details in the database
try {
    // Connect to the SQLite database
    $conn = new PDO("sqlite:$databaseFile");

    // Set error mode to exceptions
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement to update user details
    $stmt = $conn->prepare("UPDATE users SET firstname = :firstname, lastname = :lastname, phone = :phone, email = :email WHERE username = :username");

    // Bind parameters
    $stmt->bindParam(':firstname', $firstname);
    $stmt->bindParam(':lastname', $lastname);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':username', $username);

    // Execute the statement with updated details
    $stmt->execute();

    // Close the database connection
    $conn = null;

    // Send response back to the client
    echo "User details updated successfully";

} catch(PDOException $e) {
    // Handle database errors
    echo "Error: " . $e->getMessage();
}
?>

