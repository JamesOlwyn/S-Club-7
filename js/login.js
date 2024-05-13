// JavaScript code for login page
document.addEventListener("DOMContentLoaded", function() {
    // Select the login form
    const loginForm = document.querySelector('form');

    // Add event listener for form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve values from input fields
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Send login data to server
        fetch('php/login.php', {
            method: 'POST',
            body: new FormData(loginForm) // Send form data
        })
        .then(response => response.text()) // Parse response as text
        .then(data => {
            if (data.includes('Invalid username or password')) {
                // Show login error message as a pop-up
                alert('Invalid username or password');
            } else {
                // Redirect to user page if login is successful
                window.location.href = 'user.php';
            }
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors to the console
        });
    });
});

