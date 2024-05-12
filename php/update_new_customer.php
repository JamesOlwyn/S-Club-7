<?php
session_start();
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize input data
    $username = $_POST['username'];
    $password = $_POST['password'];
    $firstname = $_POST['firstname']; // Corrected variable name
    $lastname = $_POST['lastname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // SQLite database file path
    $databaseFile = '../db/rasaiCateringDB.db';

    try {
        // Open SQLite database connection
        $conn = new PDO("sqlite:$databaseFile");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare SQL statement to insert data into Customer table
        $sql = "INSERT INTO Customer (Username, Userpass, FName, LName, Phone, Email) 
                VALUES (:username, :password, :firstname, :lastname, :phone, :email)";

        // Prepare and execute statement
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':password' => $password,
            ':firstname' => $firstname,
            ':lastname' => $lastname,
            ':phone' => $phone,
            ':email' => $email
        ]);

        // Set session variable with the registered username
        $_SESSION['username'] = $username;

        // Display success message
        echo "New record created successfully";

        // Close statement and connection
        $stmt = null;
        $conn = null;
    } catch(PDOException $e) {
        // Display error message
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Error: Form not submitted";
}
?>
