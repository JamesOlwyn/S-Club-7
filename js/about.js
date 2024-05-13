// Add event listener to execute when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the logout link element
    const logoutLink = document.querySelector('#user-logout-btn a');
    // Check if the logout link element exists
    if (logoutLink) {
        // Add click event listener to the logout link
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default action of the link
            console.log("Logout link clicked!"); // Log click event to console
            logout(); // Call the logout function when the logout link is clicked
        });
    }
});

// Function to handle logout process
function logout() {
    // Confirm logout action with user
    if (confirm("Are you sure you want to logout?")) {
        // Initiate logout request to server
        fetch('php/logout.php', {
            method: 'POST', // Use POST method for logout request
        })
        .then(response => {
            // Check if logout request was successful
            if (response.ok) {
                // Clear session and local storage data
                sessionStorage.clear(); // Clear session storage
                localStorage.clear(); // Clear local storage

                // Redirect to index.php after a delay
                setTimeout(() => {
                    window.location.href = '../index.php'; // Redirect to index.php
                }, 500); // Delay in milliseconds before redirection (adjust as needed)
            } else {
                // Alert user if logout request failed
                alert('Failed to logout. Please try again later.');
            }
        })
        .catch(error => {
            // Log error if logout request encountered an error
            console.error('Error logging out:', error);
            // Alert user about the error
            alert('An error occurred while logging out. Please try again later.');
        });
    } else {
        // Do nothing if the user cancels logout
    }
}
