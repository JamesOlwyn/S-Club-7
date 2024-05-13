<?php
session_start(); // Start the session

// Check if the username session variable is set
if(isset($_SESSION['username'])) {
    
    // Make an AJAX request to fetch user details
    echo "<script>
        window.onload = function() {
            fetch('php/get_user_details.php')
            .then(response => response.json())
            .then(data => {
                // Check if data contains user details
                if (data && Object.keys(data).length > 0) {
                    // Extract user details from data object
                    const { firstname, lastname, phone, email } = data;

                    // Fill the form fields with user details
                    document.getElementById('firstname').value = firstname;
                    document.getElementById('lastname').value = lastname;
                    document.getElementById('phone').value = phone;
                    document.getElementById('email').value = email;
                } else {
                    console.error('Error: User details not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
        };
    </script>";
} else {
    // If the username session variable is not set, display an error message
    echo "<div class='welcome-message'>Session username not set. Please log in.</div>";
    // You can add further logic here, such as redirecting to the login page
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Rasai - Authentic Sri Lankan Cuisine</title>
    <link rel="icon" type="image/x-icon" href="/images/FaviconImage.png">
    <link rel="stylesheet" href="css/user.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
</head>
<body> 
    <header class="site-header">
        <img src="Images/R_white_transparentbg.png" alt="Rasai Logo" class="logo">
        <div class="container">
            <div class="menu-toggle" id="menu-toggle">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
        </div>
    </header>
    <nav class="main-nav" id="main-nav">
        <ul class="nav-list">
            <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
            <hr>
            <li class="nav-item"><a class="nav-link" href="menu.php">Menu</a></li>
            <hr>
            <li class="nav-item"><a class="nav-link" href="about.php">About</a></li>
            <hr>
            <li class="nav-item"><a class="nav-link" href="contact.php">Contact</a></li>
            <hr class="space">
            <li class="nav-title">Rasai Members</li>
            <?php if(isset($_SESSION['username'])) { ?>
            <!-- Display "My Account" link only when there is a stored username in the session -->
            <li class="nav-item"><a class="nav-link" href="user.php">My Account</a></li>
            <!-- Display "Logout" link only when there is a stored username in the session -->
            <li class="nav-item" id="user-logout-btn"><a class="nav-link" href="index.php">Logout</a></li>
			<?php } else { ?>
            <!-- Display "Login" link only when there is no stored username in the session -->
            <li class="nav-item"><a class="nav-link" href="login.php">Login</a></li>
            <!-- Display "Register" link only when there is no stored username in the session -->
            <li class="nav-item"><a class="nav-link" href="registration.php">Register</a></li>
			<?php } 
			?>
        </ul>
    </nav>
    <main>
	<?php
        // Check if the username session variable is set
if(isset($_SESSION['username'])) {
    // Display the welcome message
    echo "<div class='welcome-message content' style='color: white; font-size: 1.2em; margin-bottom: 20px;'>Welcome, " . $_SESSION['username'] . "</div>";
}
	?>
        <main>
            <div class="account-container">
                <aside class="menu">
                    <ul>
                        <li id="details-btn" class="active">My Details</li>
                        <li id="booking-btn">New Booking</li>
                        <li id="previous-btn">Previous Bookings</li>
                        <li id="message-btn">Message Rasai</li>
                        <li id="user-logout-btn">Logout</li>
                    </ul>
                </aside>
                <section class="content" id="content-area">
                </section>
            </div>
        </main>
    </main>
    <footer class="site-footer">
        <div class="container">
            <div>
                <div class="footer-bottom">
                    © 2024, Rasai NZ ||
                    <a href="privacypolicy.php" class="footer-button">Privacy Policy</a>
                    <a href="termsofservice.php" class="footer-button">Terms of Service</a>
                </div>
            </div>
            <div class="footer-social">
                <div class="social-links">
                    <a href="https://facebook.com" target="_blank" class="fa fa-facebook"></a>
                    <a href="https://instagram.com" target="_blank" class="fa fa-instagram"></a>
                    <a href="https://twitter.com" target="_blank" class="fa fa-twitter"></a>
                </div>
            </div>
        </div>
    </footer>
    <script src="js/user.js"></script>
</body>
</html>
