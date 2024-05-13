// Fetch menu options from the database
function fetchMenuOptions() {
    return fetch('php/fetch_menu_options.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch menu options');
            }
            return response.json(); // Parse JSON response
        })
        .catch(error => {
            console.error('Error fetching menu options:', error);
            // Handle error
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchMenuOptions()
        .then(menuOptions => {
            const menuItemsContainer = document.getElementById('menu-items-container');

            // Clear any existing content
            menuItemsContainer.innerHTML = '';

            // Iterate over menu options and generate HTML for each
            menuOptions.forEach(option => {
                const menuItemHTML = `
                    <div class="color-box">
                        <h3 class="box-title">${option.MenuName}</h3>
                        <p class="box-content">${option.MenuDesc}</p>
                        <p class="box-content">Price pp: ${option.MenuPrice}</p>
                    </div>
                `;
                menuItemsContainer.insertAdjacentHTML('beforeend', menuItemHTML);
            });
        })
        .catch(error => {
            console.error('Error loading menu options:', error);
        });

    // Get all the color-box elements after they have been inserted
    const boxes = document.querySelectorAll('.box-container .color-box');

    // Add a click event listener to each box
    boxes.forEach(box => {
        box.addEventListener('click', function() {
            // Toggle active class for the clicked box
            this.classList.toggle('active');
            
            // Optionally, remove active class from all other boxes
            boxes.forEach(b => {
                if (b !== this) b.classList.remove('active');
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector('#user-logout-btn a');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default action of the link
            logout(); // Call the logout function when the logout link is clicked
        });
    }
});

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        fetch('php/logout.php', {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                // Clear session data
                sessionStorage.clear(); // Clear session storage
                localStorage.clear(); // Clear local storage

                // Add a small delay before redirection
                setTimeout(() => {
                    window.location.href = '../index.php';
                }, 500); // Delay in milliseconds (adjust as needed)
            } else {
                alert('Failed to logout. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
            alert('An error occurred while logging out. Please try again later.');
        });
    } else {
        // Do nothing if the user cancels logout
    }
}
