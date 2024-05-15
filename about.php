<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<title>Rasai - Authentic Sri Lankan Cuisine</title>
<link rel="icon" type="image/x-icon" href="/images/FaviconImage.png">
<link rel="stylesheet" href="css/menu.css">
<link rel="stylesheet" href="css/about.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/footer.css">
</head>
<body>
    <header class="site-header">
        <img src="images/R_white_transparentbg.png" alt="Rasai Logo" class="logo">
        <div class="header-title">About</div>
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
    <div class="content-box">
        <img src="images/rasai_aboutthecook.jpg" alt="Description of Image" class="box-image">
        <div class="box-text">
            Born in Colombo, Sri Lanka, and having lived in Papua New Guinea for most of my schooling years, I migrated to New Zealand in 1999. I grew up where food was the center of almost everything, from family gatherings to special occasions. Yearly celebrations such as the Sinhala and Tamil New Year and Christmas mean the preparation of authentic cuisine - that reflects the Sri Lankan tradition and made with intention and care.
        
            The passion to share the authentic cuisine of Sri Lanka has inspired me to open the doors to Rasai.
        
            I welcome you to my table!
        
            <p>Rasai is more than a catering company; it's a celebration of Sri Lanka's vibrant culture. Each dish, rich with traditional spices, offers a taste of our heritage. We invite you to join us on this flavorful journey, where every meal tells the story of Sri Lanka's diverse and spirited traditions, brought directly to your events.</p>
        </div> 
    </div>
    <div class="faq-container">
        <h2 class="faq-title">FAQ</h2>
        <div class="color-box">
            <button class="accordion">How do I book your catering services?</button>
            <div class="panel">
                <p>To book our catering services, please use the booking form available on our website or contact us directly through our provided phone number or email. We recommend booking at least [X weeks] in advance to ensure availability.</p>
            </div>
            <button class="accordion">How do I book your catering services?</button>
    <div class="panel">
        <p>To book our catering services, please use the booking form available on our website or contact us directly through our provided phone number or email. We recommend booking at least [X weeks] in advance to ensure availability.</p>
    </div>
    <button class="accordion">What types of events do you cater?</button>
    <div class="panel">
        <p>We cater to a wide range of events including weddings, corporate events, birthday parties, and private gatherings. Our services are adaptable to both small and large groups, ranging from 10 to 100 attendees.</p>
    </div>
    <button class="accordion">Can I customize the menu for my event?</button>
    <div class="panel">
        <p>Yes, our menu is flexible, and we can customize it to meet your specific requirements. Please discuss your preferences with us during the booking process, and we will do our best to accommodate your needs.</p>
    </div>
    <button class="accordion">Do you provide vegetarian or vegan options?</button>
    <div class="panel">
        <p>Absolutely! We offer a variety of vegetarian and vegan dishes that are just as delicious and authentic as our traditional dishes. Please let us know your dietary requirements when you make your booking.</p>
    </div>
    <button class="accordion">Is there a minimum number of guests required to book your services?</button>
    <div class="panel">
        <p>Our catering services are available for any group size between 10 and 100 people. For smaller or larger groups, please contact us to discuss possible arrangements.</p>
    </div>
    <button class="accordion">What is included in your catering service?</button>
    <div class="panel">
        <p>Our catering service includes food preparation, delivery, and setup at your venue. We can also provide service staff and additional equipment if required, at an additional cost.</p>
    </div>
    <button class="accordion">How far in advance do I need to finalize my menu selection?</button>
    <div class="panel">
        <p>We kindly request that you finalize your menu selection at least [X weeks] before your event to ensure we can source the freshest ingredients and prepare everything to perfection.</p>
    </div>
    <button class="accordion">What are your payment terms?</button>
    <div class="panel">
        <p>We require a deposit upon booking to secure your date, with the balance due [X days] before the event. We accept payments via [list acceptable payment methods, such as credit card, bank transfer, etc.].</p>
    </div>
    <button class="accordion">What is your cancellation policy?</button>
    <div class="panel">
        <p>Cancellations made more than [X days] in advance are fully refundable minus a small administrative fee. Cancellations made closer to the event date may be subject to a percentage fee of the total booking cost.</p>
    </div>
    <button class="accordion">Do you cater to allergies and dietary restrictions?</button>
    <div class="panel">
        <p>Yes, we take dietary restrictions and allergies very seriously. Please inform us of any allergies or dietary restrictions when you book, and we will ensure that your food is prepared accordingly.</p>
    </div>
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
<script src="js/acordian.js"></script>
<script src="js/navigationHam.js"></script>
<script src="js/about.js"></script>
</body>
</html>