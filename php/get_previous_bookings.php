<?php
session_start(); // Start the session

// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Check if the username session variable is set
if(isset($_SESSION['username'])) {
    try {
        // Open a connection to the SQLite database file
        $database = new PDO('sqlite:' . $databaseFile);

        // Set the error mode to exception
        $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare the SQL query to retrieve previous bookings for the logged-in user
        $query = "SELECT * FROM Orders WHERE CustID = (SELECT CustID FROM Customer WHERE Username = :username)";

        // Prepare the statement
        $statement = $database->prepare($query);

        // Bind the parameter values
        $statement->bindParam(':username', $_SESSION['username']);

        // Execute the query
        $statement->execute();

        // Fetch all rows (bookings) as associative array
        $bookings = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Close the database connection
        $database = null;

        // Return JSON response with bookings data
        echo json_encode($bookings);
    } catch(PDOException $e) {
        // If an error occurs, return an error message
        echo json_encode(array('error' => 'Error: ' . $e->getMessage()));
    }
} else {
    // If the username session variable is not set, return an error message
    echo json_encode(array('error' => 'Session username not set. Please log in.'));
}
?>
