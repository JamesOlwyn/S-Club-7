<?php
session_start();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rasai - Authentic Sri Lankan Cuisine</title>
    <link rel="icon" href="/images/FaviconImage.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
</head>
<body>
    <header class="site-header">
        <img src="images/R_white_transparentbg.png" alt="Rasai Logo" class="logo">
        <div class="header-title">Menu</div>
        <div class="menu-toggle" id="menu-toggle">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
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
        <li class="nav-item"><a class="nav-link" href="login.php">Login</a></li>
        <hr>
        <li class="nav-item"><a class="nav-link" href="registration.php">Register</a></li>
    </ul>
	</nav>
    <main>
		<div class="centered-image">
			<img src="Images/MenuImages-removebg-preview.png" alt="Featured Dish" loading="lazy">
		</div>
		<div class="box-container" id="menu-items-container"></div>
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
</body>
<script src="js/rasi.js"></script>
<script src="js/menuphoto.js"></script>
<script src="js/navigationham.js"></script>
<script src="js/menu.js"></script>
</body>
</html>