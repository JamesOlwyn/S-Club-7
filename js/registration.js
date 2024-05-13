// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Select the registration form
    const registrationForm = document.querySelector('form');

    // Event listener for form submission
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Log the form element to ensure it's correctly selected
        console.log(registrationForm);

        // Retrieve values from input fields
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        // Log the values to ensure they are correctly retrieved
        console.log(username, password, firstname, lastname, phone, email);

        // Password validation regular expression
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

        // Validate password against the regular expression
        if (!passwordPattern.test(password)) {
            // Password does not meet the criteria, alert the user
            alert('Password must be 8-12 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)');
            return; // Exit the function
        }

        // Send form data if password is valid
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
});
