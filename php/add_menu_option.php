<?php
session_start();
// SQLite database file path
$databaseFile = '../db/rasaiCateringDB.db';

// Check if the form data has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assuming you have sanitized the input data to prevent SQL injection
    $menuName = $_POST["MenuName"];
    $menuDesc = $_POST["MenuDesc"];
    $menuPrice = $_POST["MenuPrice"];

    // Establish a connection to the SQLite database
    $db = new SQLite3($databaseFile);

    // Prepare SQL statement
    $statement = $db->prepare("INSERT INTO Menu (MenuName, MenuDesc, MenuPrice) VALUES (:menuName, :menuDesc, :menuPrice)");

    // Bind parameters
    $statement->bindValue(':menuName', $menuName, SQLITE3_TEXT);
    $statement->bindValue(':menuDesc', $menuDesc, SQLITE3_TEXT);
    $statement->bindValue(':menuPrice', $menuPrice, SQLITE3_TEXT);

    // Execute the statement
    $result = $statement->execute();

    if ($result) {
        // Successfully added to the database
        echo "Menu option added successfully";
    } else {
        // Failed to add to the database
        echo "Failed to add menu option to the database";
    }

    // Close the database connection
    $db->close();
} else {
    // Handle invalid request method
    echo "Invalid request method";
}
?>
