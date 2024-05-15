<?php
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Connect to SQLite database
try {
    $db = new PDO('sqlite:' . $databaseFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to fetch all bookings
    $query = "SELECT * FROM Orders";
    $stmt = $db->query($query);
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($bookings);
} catch (PDOException $e) {
    // Handle database connection error
    http_response_code(500);
    echo json_encode(['error' => 'Database connection error: ' . $e->getMessage()]);
}
?>
