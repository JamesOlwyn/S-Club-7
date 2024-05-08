<?php
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

try {
    // Connect to SQLite database
    $db = new PDO('sqlite:' . $databaseFile);

    // Fetch all menu options
    $query = $db->query('SELECT * FROM Menu');
    $menuOptions = $query->fetchAll(PDO::FETCH_ASSOC);

    // Close database connection
    $db = null;

    // Return menu options as JSON
    echo json_encode($menuOptions);
} catch (PDOException $e) {
    // Handle database connection error
    echo "Error: " . $e->getMessage();
}
?>
