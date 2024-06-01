<?php
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the SQLite database file exists
    if (!file_exists($databaseFile)) {
        die("SQLite database file not found");
    }

    // Extract user data from POST request
    $custID = $_POST['CustID'];
    $username = $_POST['Username'];
    $email = $_POST['Email'];
    $password = $_POST['Password'];
    $fName = $_POST['FName']; // Additional fields
    $lName = $_POST['LName']; // Additional fields
    $phone = $_POST['Phone']; // Additional fields

    try {
        // Connect to the SQLite database
        $pdo = new PDO("sqlite:$databaseFile");

        // Prepare SQL statement to update user
        $sql = "UPDATE Customer SET Username = ?, Email = ?, Userpass = ?, FName = ?, LName = ?, Phone = ? WHERE CustID = ?";
        $stmt = $pdo->prepare($sql);

        // Bind parameters and execute the statement
        $stmt->execute([$username, $email, $password, $fName, $lName, $phone, $custID]);

        // Check if any rows were affected (update successful)
        if ($stmt->rowCount() > 0) {
            $response = "User updated successfully";
        } else {
            $response = "No user updated";
        }
    } catch (PDOException $e) {
        // Handle database connection or query errors
        $response = "Error updating user: " . $e->getMessage();
    }
} else {
    // Handle invalid request method
    $response = "Invalid request method";
}

// Return JSON response
echo json_encode(['message' => $response]);
?>
