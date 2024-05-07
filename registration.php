<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Rasai</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/registration.css">
</head>
<body>
    <div class="register-container">
        <a href="javascript:history.back()" class="back-arrow"><i class="fa fa-arrow-left"></i></a>
        <h2 class="register-title">Register for Rasai</h2>
        <form action="/submit-your-registration-form" method="post">
            <div class="form-group icon-input">
                <i class="fa fa-user"></i>
                <input type="text" id="username" name="username" placeholder="Choose a username" required>
            </div>
            <div class="form-group icon-input">
                <i class="fa fa-lock"></i>
                <input type="password" id="password" name="password" placeholder="Create a Password" required>
            </div>
            <div class="form-group icon-input">
                <i class="fa fa-user"></i>
                <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" required>
            </div>
            <div class="form-group icon-input">
                <i class="fa fa-user"></i>
                <input type="text" id="lastname" name="lastname" placeholder="Enter your last name" required>
            </div>
            <div class="form-group icon-input">
                <i class="fa fa-phone"></i>
                <input type="tel" id="phone" name="phone" placeholder="Phone number" required>
            </div>
            <div class="form-group icon-input">
                <i class="fa fa-envelope"></i>
                <input type="email" id="email" name="email" placeholder="Email address" required>
            </div>
            <div class="form-group">
                <button type="submit">Register</button>
            </div>
            <div class="login-link">
                <p>Already a member? <a href="Login.php">Login here</a></p>
            </div>
        </form>
    </div>
</body>
</html>