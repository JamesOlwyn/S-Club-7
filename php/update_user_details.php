<?php
session_start();

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Check if all required POST parameters are set
if (!isset($_POST['firstname'], $_POST['lastname'], $_POST['phone'], $_POST['email'])) {
    echo "Error: Required parameters are missing";
    exit; // Terminate script execution
}

// Retrieve updated details from POST data
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$password = isset($_POST['password']) ? $_POST['password'] : null; // Check if password is set

// Update the user details in the database only if changes are detected
try {
    // Connect to the SQLite database
    $conn = new PDO("sqlite:$databaseFile");

    // Set error mode to exceptions
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement to update user details
    $updateStmt = "UPDATE Customer SET FName = :firstname, LName = :lastname, Phone = :phone, Email = :email";

    // Add password update if password is provided
    if ($password !== null) {
        $updateStmt .= ", Userpass = :password";
    }

    $updateStmt .= " WHERE Username = :username";

    // Prepare SQL statement
    $stmt = $conn->prepare($updateStmt);

    // Bind parameters
    $stmt->bindParam(':firstname', $firstname);
    $stmt->bindParam(':lastname', $lastname);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':username', $_SESSION['username']);

    // Bind password parameter if provided
    if ($password !== null) {
        $stmt->bindParam(':password', $password);
    }

    // Execute the update statement
    $stmt->execute();

    // Check if any rows were affected
    $rowsAffected = $stmt->rowCount();

    if ($rowsAffected > 0) {
        // Send response back to the client
        echo "User details updated successfully";
    } else {
        echo "No changes detected in user details";
    }

    // Close the database connection
    $conn = null;

} catch(PDOException $e) {
    // Handle database errors
    echo "Error: " . $e->getMessage();
}
?>
