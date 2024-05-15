<?php
session_start(); // Start the session

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Start output buffering
ob_start();

// Check if the form data has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assuming you have sanitized the input data to prevent SQL injection
    $orderDate = $_POST["OrderDate"];
    $orderAddress = $_POST["OrderAddress"];
    $adultGuests = $_POST["AdultGuests"];
    $childGuests = $_POST["ChildGuests"];
    $username = $_POST["Username"]; // Added username field

    // Establish a connection to the SQLite database
    $db = new SQLite3($databaseFile);

    // Get the CustID for the provided username
    $query = $db->prepare("SELECT CustID FROM Customer WHERE Username = :username");
    $query->bindValue(':username', $username, SQLITE3_TEXT);
    $result = $query->execute();
    $row = $result->fetchArray(SQLITE3_ASSOC);
    $custID = $row['CustID'];

    // Check if CustID exists for the provided username
    if ($custID) {
        // Prepare SQL statement
        $statement = $db->prepare("INSERT INTO Orders (CustID, OrderDate, OrderAddress, AdultGuests, ChildGuests) VALUES (:custID, :orderDate, :orderAddress, :adultGuests, :childGuests)");

        // Bind parameters
        $statement->bindValue(':custID', $custID, SQLITE3_INTEGER);
        $statement->bindValue(':orderDate', $orderDate, SQLITE3_TEXT);
        $statement->bindValue(':orderAddress', $orderAddress, SQLITE3_TEXT);
        $statement->bindValue(':adultGuests', $adultGuests, SQLITE3_INTEGER);
        $statement->bindValue(':childGuests', $childGuests, SQLITE3_INTEGER);

        // Execute the statement
        $result = $statement->execute();

        if ($result) {
            // Successfully added to the database
            echo "Booking added successfully";
        } else {
            // Failed to add to the database
            http_response_code(500); // Internal Server Error
            echo "Failed to add booking to the database";
        }
    } else {
        // Username not found in the database
        http_response_code(400); // Bad Request
        echo "Username not found in the database";
    }

    // Close the database connection
    $db->close();
} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo "Invalid request method";
}

// Flush the output buffer and send the response
ob_end_flush();
?>
