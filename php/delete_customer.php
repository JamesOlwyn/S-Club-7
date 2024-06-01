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

    // Extract user ID from the decoded JSON
    $userID = $data['CustID'];

    try {
        // Connect to the SQLite database
        $pdo = new PDO("sqlite:$databaseFile");

        // Prepare SQL statement to delete user
        $sql = "DELETE FROM Customer WHERE CustID = ?";
        $stmt = $pdo->prepare($sql);

        // Bind parameter and execute the statement
        $stmt->execute([$userID]);

        // Check if any rows were affected (deletion successful)
        if ($stmt->rowCount() > 0) {
            $response = "User deleted successfully";
        } else {
            $response = "No user deleted";
        }
    } catch (PDOException $e) {
        // Handle database connection or query errors
        $response = "Error deleting user: " . $e->getMessage();
    }
} else {
    // Handle invalid request method
    $response = "Invalid request method";
}

// Return JSON response
echo json_encode(['message' => $response]);
?>
