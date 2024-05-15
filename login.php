<?php
session_start(); // Start the session

// Check if login error message is set
if (isset($_SESSION['login_error'])) {
    $loginErrorMessage = $_SESSION['login_error'];
    unset($_SESSION['login_error']); // Clear the error message
}

// Check if the form is submitted and process login
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // SQLite database file path
    $databaseFile = 'db/rasaiCateringDB.db';

    // Retrieve username and password from the form
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        $conn = new SQLite3($databaseFile);
    } catch (Exception $e) {
        echo 'Error connecting to database: ' . $e->getMessage();
    }

    $sql = "SELECT * FROM Customer WHERE Username = '$username' AND Userpass = '$password'";
    $result = $conn->query($sql);

    if ($result->fetchArray()) {
        // Login successful
        $_SESSION['username'] = $username;
        if ($username === "admin") {
            header("Location: admin.php"); // Redirect to admin.php if username is admin
        } else {
            header("Location: user.php"); // Redirect to user.php for other users
        }
        exit; // Ensure that no further output is sent
    } else {
        // Login failed
        $_SESSION['login_error'] = "Invalid username or password";
        // Redirect back to login page
        header("Location: login.php");
        exit; // Ensure that no further output is sent
    }
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Rasai</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/login.css">
    <style>
        .error-message {
            color: red;
        }
    </style>
</head>
<body>
    <div class="login-container">
	<a href="javascript:history.back()" class="back-arrow"><i class="fa fa-arrow-left"></i></a>
        <h2 class="login-title">Rasai Login</h2> 
        <?php if (isset($loginErrorMessage)): ?>
            <div class="error-message"><?php echo $loginErrorMessage; ?></div>
        <?php endif; ?>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group icon-input">
                <i class="fa fa-user"></i>
                <input type="text" id="username" name="username" placeholder="Type your username" required>
            </div>
            <div class="form-group icon-input">
                <i class="fa fa-lock"></i>
                <input type="password" id="password" name="password" placeholder="Type your Password" required>
            </div>
            <div class="form-group">
                <button type="submit">Login</button>
            </div>
            <div class="register-link">
                <p>Not a member? <a href="Registration.php">Register here</a></p>
            </div>
            <div class="social-login">
                <a href="https://facebook.com" class="fa fa-facebook social-icon"></a>
                <a href="https://twitter.com" class="fa fa-twitter social-icon"></a>
                <a href="https://youtube.com" class="fa fa-youtube social-icon"></a>
            </div>
        </form>
    </div>
</body>
</html>
