<?php
session_start(); // Start the session

// Check if the logout request is received
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Clear all session data
    session_unset();
    session_destroy();
    // Redirect to the home page
    header("Location: ../index.php");
    exit; 
}
?>
