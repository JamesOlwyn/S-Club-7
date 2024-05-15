<?php
session_start(); // Start the session

// Check if the session username is set
if(isset($_SESSION['username'])) {
    // Get the session username
    $username = $_SESSION['username'];

    // Retrieve other form data
    $address = $_POST['address'];
    $eventDate = $_POST['eventDate'];
    $adultGuests = $_POST['adultGuests'];
    $childGuests = $_POST['childGuests'];

    // SQLite database file path
    $databaseFile = '../db/rasaiCateringDB.db';

    try {
        // Open connection to SQLite database
        $pdo = new PDO('sqlite:' . $databaseFile);
        // Set PDO to throw exceptions on error
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare SQL statement
        $stmt = $pdo->prepare("INSERT INTO Orders (CustID, OrderDate, OrderAddress, AdultGuests, ChildGuests) 
                               VALUES ((SELECT CustID FROM Customer WHERE Username = :username), :eventDate, :address, :adultGuests, :childGuests)");
        
        // Bind parameters
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':eventDate', $eventDate);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':adultGuests', $adultGuests);
        $stmt->bindParam(':childGuests', $childGuests);

        // Execute the statement
        $stmt->execute();

        // Close the connection
        $pdo = null;

        // Send a success response
        http_response_code(200);
        echo json_encode(array("message" => "Booking submitted successfully!"));
    } catch(PDOException $e) {
        // If an error occurs, send a 500 internal server error response
        http_response_code(500);
        echo json_encode(array("message" => "Failed to submit booking. Error: " . $e->getMessage()));
    }
} else {
    // If the session username is not set, send a 403 forbidden response
    http_response_code(403);
    echo json_encode(array("message" => "Session username not set. Please log in."));
}
?>
