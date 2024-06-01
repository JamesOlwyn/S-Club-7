<?php
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the SQLite database file exists
    if (!file_exists($databaseFile)) {
        echo json_encode(['message' => "SQLite database file not found"]);
        exit();
    }

    // Get the raw POST data and decode the JSON
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);

    // Extract user data from the decoded JSON
    $username = $data['Username'];
    $email = $data['Email'];
    $password = $data['Password'];
    $fName = $data['FName']; // Additional fields
    $lName = $data['LName']; // Additional fields
    $phone = $data['Phone']; // Additional fields

    try {
        // Connect to the SQLite database
        $pdo = new PDO("sqlite:$databaseFile");

        // Prepare SQL statement to insert new user
        $sql = "INSERT INTO Customer (Username, Email, Userpass, FName, LName, Phone) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);

        // Bind parameters and execute the statement
        $stmt->execute([$username, $email, $password, $fName, $lName, $phone]);

        // Check if any rows were affected (insert successful)
        if ($stmt->rowCount() > 0) {
            $response = "User inserted successfully";
        } else {
            $response = "No user inserted";
        }
    } catch (PDOException $e) {
        // Handle database connection or query errors
        $response = "Error inserting user: " . $e->getMessage();
    }
} else {
    // Handle invalid request method
    $response = "Invalid request method";
}

// Return JSON response
echo json_encode(['message' => $response]);
?>
