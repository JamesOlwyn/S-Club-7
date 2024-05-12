// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the registration form
    const registrationForm = document.querySelector('form');

    // Add an event listener for form submission
    registrationForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Send the form data using fetch API
        fetch('php/update_new_customer.php', {
            method: 'POST',
            body: new FormData(registrationForm)
        })
        .then(response => response.text())
        .then(data => {
            // Check if the registration was successful
            if (data.includes('New record created successfully')) {
                // Display a success message
                alert('Registration successful!');

                // Redirect to user.php after a short delay
                setTimeout(function() {
                    window.location.href = 'user.php';
                }, 1000); // Redirect after 1 second
            } else {
                // Display an error message
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
