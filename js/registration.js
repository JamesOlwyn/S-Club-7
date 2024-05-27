// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Select the registration form
    const registrationForm = document.querySelector('form');

    // Event listener for form submission
    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve values from input fields
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        // Password validation regular expression
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Validate password against the regular expression
        if (!passwordPattern.test(password)) {
            // Password does not meet the criteria, alert the user
            alert('Password must be a minimum of 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)');
            return; // Exit the function
        }

        // Check if username is available
        const isUsernameAvailable = await checkUsernameAvailability(username);

        // If username is not available, alert the user and exit the function
        if (!isUsernameAvailable) {
            alert('Username is already taken. Please choose another one.');
            return;
        }

        // Send form data if username is available
        fetch('php/update_new_customer.php', {
            method: 'POST', // Use POST method for the request
            body: new FormData(registrationForm) // Send form data
        })
        .then(response => response.text()) // Parse response as text
        .then(data => {
            if (data.includes('New record created successfully')) {
                // Registration successful, alert the user and redirect after a delay
                alert('Registration successful!');
                setTimeout(function() {
                    window.location.href = 'user.php';
                }, 1000); // Delay in milliseconds (adjust as needed)
            } else {
                // Registration failed, alert the user
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            // Log any errors encountered during the fetch request
            console.error('Error:', error);
        });
    });

    // Function to check username availability
    async function checkUsernameAvailability(username) {
        try {
            const response = await fetch('php/check_username.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username })
            });

            // Check if the response is a JSON object
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return !data.exists; // Return true if username is available, false if not
        } catch (error) {
            console.error('Error checking username availability:', error);
            return false; // Return false in case of an error
        }
    }
});
