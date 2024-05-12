<?php
session_start();
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize input data
    $username = $_POST['username'];
    $password = $_POST['password'];
    $fullname = $_POST['fullname'];
    $lastname = $_POST['lastname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    try {
        // Connect to SQLite database
        $conn = new PDO("sqlite:" . $databaseFile);

        // Set error mode to exceptions
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare SQL statement to insert data into Customer table
        $stmt = $conn->prepare("INSERT INTO Customer (Username, Userpass, FName, LName, Phone, Email) 
                                VALUES (:username, :password, :fullname, :lastname, :phone, :email)");

        // Bind parameters
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':fullname', $fullname);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':email', $email);

        // Execute the statement
        $stmt->execute();

        echo "New record created successfully";

        // Close connection
        $conn = null;
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Error: Form not submitted";
}
?>
