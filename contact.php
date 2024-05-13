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
<link rel="stylesheet" href="css/contact.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/footer.css">
</head>
<body>
    <header class="site-header">
        <img src="images/R_white_transparentbg.png" alt="Rasai Logo" class="logo">
        <div class="header-title">Contact</div> <!-- Page specific title -->
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
    <div class="contact-top-section">
        <div class="contact-top-left">
            <h2 class="contact-top-header">Box 1</h2>
            <div class="contact-top-text">
                <p>At Rasai, we are dedicated to providing exceptional catering services tailored to your specific needs. Whether you're planning a corporate event, a private celebration, or any special occasion, our team is committed to ensuring your event is a resounding success with delicious and elegantly presented cuisine.</p>

                <p>Please use the form below to tell us about your event and how we can assist you. This will allow us to prepare a customized proposal that aligns with your event's requirements and budget.</p>

                <p>Alternatively, if you prefer a more direct interaction or need immediate assistance, please do not hesitate to contact me at:</p>
            <ul>
                <li><strong>Phone number:</strong> 0210 452 333</li>
                <li><strong>Email:</strong> <a href="mailto:info@rasai.co.nz">info@rasai.co.nz</a></li>
            </ul>
            
            <p>We will respond promptly to discuss how we can make your event memorable.</p>
            <p>We look forward to creating an unforgettable dining experience for you and your guests. Thank you for considering Rasai for your catering needs.</p>
        </div>
        </div>
        <div class="contact-top-right">
            <img src="Images/Screenshot 2024-04-18 201817.png" alt="Calendar Image" class="calendar-image">
        </div>
    </div>

        <div class="contact-box">
            <form class="form" id="myForm">
                <div class="contact-form-inputs">
                    <div class="form-left">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" placeholder="Enter first name" required>
            
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" placeholder="Enter last name" required>
            
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Enter email" required>
            
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" placeholder="123-456-7890" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Phone number must be in the format: 123-456-7890">
                    </div>
                    <div class="form-right">
                        <label for="date">Date of Event</label>
                        <input type="date" id="date" placeholder="Select date" required>
            
                        <label for="time">Time of Event</label>
                        <input type="time" id="time" placeholder="Select time" required>
            
                        <label for="adults">Number of Adults</label>
                        <input type="number" id="adults" placeholder="Adults" required>
            
                        <label for="children">Number of Children</label>
                        <input type="number" id="children" placeholder="Children" required>
                    </div>
                </div>
                <label for="eventDescription">About Your Event</label>
                <textarea id="eventDescription" placeholder="Details here" required></textarea>
                <button type="submit" class="form-submit-button">Submit</button>
            </form>
        </div>
        
            <div class="contact-thank-you" id="thankYouMsg">
                <p>Thank you for your submission!</p>
            </div>
        </div>
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

<script src="js/navigationham.js"></script>
<script src="js/contactform.js"></script>
<script src="js/emailverify.js"></script>

</body>
</html>