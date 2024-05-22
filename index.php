<?php
session_start();
?>
<!--- thomas test 2 -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<title>Rasai - Authentic ri Lankan Cuisine</title>
<link rel="icon" type="image/x-icon" href="/images/FaviconImage.png">
<link rel="stylesheet" href="css/index.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/footer.css">
</head>
<body>
    <header class="site-header">
        <img src="images/rasai_white.png" alt="Rasai Logo" class="logo index-logo"> <!-- Ensure the correct image source -->
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
        <?php 
		if(isset($_SESSION['username'])) {
			// Display "Logout" link only when there is a stored username in the session
			?>
			<li class="nav-item" id="user-logout-btn"><a class="nav-link" href="index.php">Logout</a></li>
			<?php 
			if ($_SESSION['username'] == "admin") {
				// If the username is "admin", redirect to admin.php
				?>
				<li class="nav-item"><a class="nav-link" href="admin.php">My Account</a></li>
				<?php
			} else {
				// For other users, continue to user.php
				?>
				<li class="nav-item"><a class="nav-link" href="user.php">My Account</a></li>
				<?php
			}
		} else {
			// Display "Login" link only when there is no stored username in the session
			?>
			<li class="nav-item"><a class="nav-link" href="login.php">Login</a></li>
			<!-- Display "Register" link only when there is no stored username in the session -->
			<li class="nav-item"><a class="nav-link" href="registration.php">Register</a></li>
		<?php 
		} 
		?>
    </ul>
</nav>
<main>
    <section id="home">
        <div class="video-container">
            <iframe
                src="https://www.youtube.com/embed/l5cSX6I5F_w?autoplay=1&mute=1&loop=1&playlist=l5cSX6I5F_w&enablejsapi=1" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
            </iframe>
        </div>
            <div class="text-box">
                <h1>Welcome to Rasai</h1>
                <p>Rasai in Sinhalese means “tasty.” It reflects the authenticity, the richness, and the vibrancy of Sri Lanka’s diverse culinary traditions. Complex and vibrant, Sri Lankan cuisine is well known for its combination of herbs and spices and is centered around many varieties of rice. Coconut milk, oil and pulp also play a significant role in the cuisine, as is preserved fish. A hub in the historic oceanic Silk Road, contact with foreign traders brought new food items and cultural influences in addition to the local traditions of the country's ethnic groups, all of which have helped shape the cuisine of Sri Lanka. I have a passion for preparing authentic and traditional Sri Lankan meals, through trialing different combination of spices to bring out the best flavours of meat, seafood and vegetables. I am inspired to share my Sri Lankan heritage and culture through authentic dishes from my homeland.</p>
            </div>
            <div class="gallery-container">
                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="Images/Food1.jpg">
                            <img src="Images/Food1.jpg" alt="Cinque Terre">
                        </a>
                    </div>
                </div>
                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="Images/Food2.jpg">
                            <img src="Images/Food2.jpg" alt="Forest">
                        </a>
                    </div>
                </div>
                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="Images/Food3.jpg">
                            <img src="Images/Food3.jpg" alt="Northern Lights">
                        </a>
                    </div>
                </div>
                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="Images/Food4.jpg">
                            <img src="Images/Food4.jpg" alt="Mountains">
                        </a>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
      </section>
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
<script src="js/navigationham.js"></script>
<script src="js/contactform.js"></script>
<script src="js/emailverify.js"></script>
<script src="js/index.js"></script>
</body>
</html>
