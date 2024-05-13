// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the logout link element
    const logoutLink = document.querySelector('#user-logout-btn a');
    
    // Check if the logout link exists
    if (logoutLink) {
        // Add event listener for click event on the logout link
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default action of the link
            console.log("Logout link clicked!"); // Log a message to the console
            logout(); // Call the logout function when the logout link is clicked
        });
    }
});

// Function to handle logout process
function logout() {
    // Confirm logout with the user
    if (confirm("Are you sure you want to logout?")) {
        // Send logout request to the server
        fetch('php/logout.php', {
            method: 'POST', // Use POST method
        })
        .then(response => {
            // Check if the response is successful
            if (response.ok) {
                // Clear session and local storage
                sessionStorage.clear(); // Clear session storage
                localStorage.clear(); // Clear local storage

                // Add a small delay before redirection to ensure session is cleared
                setTimeout(() => {
                    window.location.href = '../index.php'; // Redirect to the home page
                }, 500); // Delay in milliseconds (adjust as needed)
            } else {
                // Display error message if logout fails
                alert('Failed to logout. Please try again later.');
            }
        })
        .catch(error => {
            // Log error to the console and display alert message
            console.error('Error logging out:', error);
            alert('An error occurred while logging out. Please try again later.');
        });
    } else {
        // Do nothing if the user cancels logout
    }
}
