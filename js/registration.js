document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.querySelector('form');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

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

        if (!passwordPattern.test(password)) {
            // Password does not meet the criteria
            alert('Password must be 8-12 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)');
            return;
        }

        // Send form data if password is valid
        fetch('php/update_new_customer.php', {
            method: 'POST',
            body: new FormData(registrationForm)
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes('New record created successfully')) {
                alert('Registration successful!');
                setTimeout(function() {
                    window.location.href = 'user.php';
                }, 1000);
            } else {
                alert('Registration failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
