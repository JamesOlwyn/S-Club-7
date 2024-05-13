// Add event listeners to buttons
document.getElementById('bookings-btn').addEventListener('click', function() {
    loadBookings();
});

document.getElementById('rasaimenu-btn').addEventListener('click', function() {
    loadRasaiMenu();
});

document.getElementById('Users-btn').addEventListener('click', function() {
    loadUsers();
});

// Function to load bookings
function loadBookings() {
    document.getElementById('content-area').innerHTML = `
        <div class="details-box">
            <h2>Manage Bookings</h2>
            <p>Here you can view and manage all bookings.</p>
        </div>
    `;
    // Remove 'active' class from all tabs
    const navItems = document.querySelectorAll('.menu li');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    // Add 'active' class to the selected tab
    document.getElementById('bookings-btn').classList.add('active');
}

// Function to fetch menu options from the database
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

// Ensure formData is initialized globally
let formData = new FormData();

// Function to load Rasai menu
function loadRasaiMenu() {
    // Fetch menu options from the database
    fetchMenuOptions().then(menuOptions => {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = ''; // Clear existing content

        // Create table element
        const table = document.createElement('table');
        table.classList.add('menu-table');

        // Create table header row
        const headerRow = document.createElement('tr');
        const headers = ['Name', 'Description', 'Price', 'Actions'];
        headers.forEach(headerText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });
        table.appendChild(headerRow);

        // Loop through each menu option and create table rows
        menuOptions.forEach(menuItem => {
            const row = document.createElement('tr');

            // Menu Name
            const nameCell = document.createElement('td');
            const nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('value', menuItem.MenuName);
            nameCell.appendChild(nameInput);
            row.appendChild(nameCell);

            // Menu Description
            const descCell = document.createElement('td');
            const descTextarea = document.createElement('textarea');
            descTextarea.textContent = menuItem.MenuDesc;
            descTextarea.classList.add('desc-textarea');
            descCell.appendChild(descTextarea);
            row.appendChild(descCell);

            // Menu Price
            const priceCell = document.createElement('td');
            const priceInput = document.createElement('input');
            priceInput.setAttribute('type', 'text');
            priceInput.setAttribute('value', menuItem.MenuPrice);
            priceCell.appendChild(priceInput);
            row.appendChild(priceCell);

            // Update Button
            const updateCell = document.createElement('td');
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', function() {
                // Prepare FormData with updated values
                const formData = new FormData();
                formData.append('MenuID', menuItem.MenuID);
                formData.append('MenuName', nameInput.value);
                formData.append('MenuDesc', descTextarea.value);
                formData.append('MenuPrice', priceInput.value);

                // Call function to update menu
                updateMenu(formData);
            });
            updateCell.appendChild(updateButton);
            row.appendChild(updateCell);

            // Delete Button
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                // Call function to delete menu
                deleteMenu(menuItem.MenuID);
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            table.appendChild(row);
        });

        // Append table to content area
        contentArea.appendChild(table);

        // Add New Button
        const addNewButton = document.createElement('button');
        addNewButton.textContent = 'Add New';
        addNewButton.addEventListener('click', function() {
            showAddMenuForm();
        });
        contentArea.appendChild(addNewButton);
        
        // Remove 'active' class from all tabs
        const navItems = document.querySelectorAll('.menu li');
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        // Add 'active' class to the selected tab
        document.getElementById('rasaimenu-btn').classList.add('active');
    }).catch(error => {
        console.error('Error loading Rasai menu:', error);
        // Handle error
    });
}


// Function to delete menu from the database
function deleteMenu(menuID) {
    fetch('php/delete_menu_option.php', {
        method: 'POST',
        body: JSON.stringify({ MenuID: menuID }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete menu option');
        }
        return response.json(); // Assuming the server responds with a success message
    })
    .then(responseData => {
        alert('Menu option deleted successfully');
        // Reload Rasai menu after successful deletion
        loadRasaiMenu();
    })
    .catch(error => {
        console.error('Error deleting menu option:', error);
        // Handle error
    });
}

// Function to show the form for adding a new menu option
function showAddMenuForm() {
    const contentArea = document.getElementById('content-area');
    
    // Clear existing content
    contentArea.innerHTML = '';

    // Create form element
    const form = document.createElement('form');

    // Menu Name
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameLabel.appendChild(nameInput);
    form.appendChild(nameLabel);

    // Menu Description
    const descLabel = document.createElement('label');
    descLabel.textContent = 'Description:';
    const descTextarea = document.createElement('textarea');
    descTextarea.classList.add('desc-textarea');
    descLabel.appendChild(descTextarea);
    form.appendChild(descLabel);

    // Menu Price
    const priceLabel = document.createElement('label');
    priceLabel.textContent = 'Price:';
    const priceInput = document.createElement('input');
    priceInput.setAttribute('type', 'text');
    priceLabel.appendChild(priceInput);
    form.appendChild(priceLabel);

    // Add some space
    form.appendChild(document.createElement('br'));

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData();
        formData.append('MenuName', nameInput.value);
        formData.append('MenuDesc', descTextarea.value);
        formData.append('MenuPrice', priceInput.value);
        addNewMenu(formData);
    });
    form.appendChild(submitButton);

    // Append form to content area
    contentArea.appendChild(form);
}

// Function to add a new menu option to the database
function addNewMenu(formData) {
    fetch('php/add_menu_option.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add new menu option');
        }
        // Assuming the server responds with a success message
        return 'success'; 
    })
    .then(status => {
        if (status === 'success') {
            // Display success message
            alert('Menu option added successfully');
            // Reload Rasai menu to display the newly added option
            loadRasaiMenu();
        }
    })
    .catch(error => {
        console.error('Error adding new menu option:', error);
        // Handle error
    });
}

// Function to update the menu in the database
function updateMenu(formData) {
    fetch('php/update_menu_options.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update menu');
        }
        return response.text(); // Get raw response content
    })
    .then(text => {
        console.log('Response from server:', text); // Log the raw response
        // Check if the response indicates success or failure
        if (text.includes('successfully')) {
            alert('Menu option updated successfully');
            // Reload Rasai menu after successful update
            loadRasaiMenu();
        } else {
            throw new Error('Failed to update menu: ' + text);
        }
    })
    .catch(error => {
        console.error('Error updating menu:', error);
        // Handle error
    });
}

// Function to populate form with selected menu details
function populateForm(selectedMenu, form) {
    // Clear existing form fields
    form.innerHTML = '';

    // Create input fields for each menu detail
    Object.keys(selectedMenu).forEach(key => {
        // Create label
        const label = document.createElement('label');
        label.textContent = key + ':';
        label.setAttribute('for', key);
        form.appendChild(label);

        // Create input field
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', key); 
        input.setAttribute('id', key); 
        input.setAttribute('value', selectedMenu[key]);
        form.appendChild(input);

        form.appendChild(document.createElement('br'));
    });

    // Add a hidden input field for MenuID
    const hiddenMenuID = document.createElement('input');
    hiddenMenuID.setAttribute('type', 'hidden');
    hiddenMenuID.setAttribute('name', 'MenuID');
    hiddenMenuID.setAttribute('value', selectedMenu['MenuID']);
    form.appendChild(hiddenMenuID);

    // Add a submit button to the form
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Update';
    submitButton.addEventListener('click', function() {
        // Serialize form data
        const formData = new FormData(form);
        // Call function to handle form submission with form data
        console.log('Form data:', formData);
        updateMenu(formData);
    });
    form.appendChild(submitButton);
}

// Function to load users
function loadUsers() {
    document.getElementById('content-area').innerHTML = `
        <div class="details-box">
            <h2>Manage Users</h2>
            <p>Here you can manage user accounts, set permissions, and view user activity.</p>
        </div>
    `;
    // Remove 'active' class from all tabs
    const navItems = document.querySelectorAll('.menu li');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    // Add 'active' class to the selected tab
    document.getElementById('Users-btn').classList.add('active');
}

// Toggle the hamburger menu
document.getElementById('menu-toggle').addEventListener('click', function() {
    this.classList.toggle("change");
    document.getElementById('main-nav').classList.toggle("active");
});

// Add event listener to window to load bookings and highlight the default tab when the page loads
window.addEventListener('load', function() {
    loadBookings(); // Load bookings content by default
    document.getElementById('bookings-btn').classList.add('active'); // Highlight the Bookings tab by adding 'active' class
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