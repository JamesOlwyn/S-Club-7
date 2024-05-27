<?php
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the posted JSON data
    $data = json_decode(file_get_contents("php://input"));

    // Check if username is provided in the JSON data
    if (isset($data->username)) {
        // Sanitize the username to prevent SQL injection
        $username = SQLite3::escapeString($data->username);

        // Create a new SQLite3 database connection
        $db = new SQLite3($databaseFile);

        // Prepare the SQL query to check if the username exists
        $query = "SELECT COUNT(*) as count FROM Customer WHERE Username = '$username'";

        // Execute the query
        $result = $db->query($query);

        // Check if query execution was successful
        if ($result) {
            // Fetch the result
            $row = $result->fetchArray(SQLITE3_ASSOC);

            // Prepare response data
            $response = array('exists' => $row['count'] > 0);

            // Send JSON response
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            // Error in query execution
            $errorResponse = array('error' => 'Error executing query');
            header('Content-Type: application/json');
            http_response_code(500); // Internal Server Error
            echo json_encode($errorResponse);
        }

        // Close the database connection
        $db->close();
    } else {
        // Username is not provided in the request
        $errorResponse = array('error' => 'Username is required');
        header('Content-Type: application/json');
        http_response_code(400); // Bad Request
        echo json_encode($errorResponse);
    }
} else {
    // Invalid request method
    $errorResponse = array('error' => 'Only POST requests are allowed');
    header('Content-Type: application/json');
    http_response_code(405); // Method Not Allowed
    echo json_encode($errorResponse);
}
?>
