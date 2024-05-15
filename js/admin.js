// Add event listeners to buttons
document.getElementById('bookings-btn').addEventListener('click', function() {
    loadAllBookings();
});

document.getElementById('rasaimenu-btn').addEventListener('click', function() {
    loadRasaiMenu();
});

document.getElementById('Users-btn').addEventListener('click', function() {
    loadUsers();
});


// Function to load all bookings for admin
function loadAllBookings() {
    // Fetch all bookings from the server
    fetch('../php/fetch_all_bookings.php')
        .then(response => response.json())
        .then(bookings => {
            const contentArea = document.getElementById('content-area');
            contentArea.innerHTML = ''; // Clear existing content

            // Create table element
            const table = document.createElement('table');
            table.classList.add('booking-table');

            // Create table header row
            const headerRow = document.createElement('tr');
            const headers = ['Username', 'Date', 'Address', 'Adults', 'Children', 'Actions'];
            headers.forEach(headerText => {
                const headerCell = document.createElement('th');
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });
            table.appendChild(headerRow);

            // Loop through each booking and create table rows
            bookings.forEach(booking => {
                const row = document.createElement('tr');

                // Fetch and display full name based on CustID
				const usernameCell = document.createElement('td');
				fetchUsername(booking.CustID)
					.then(username => {
						usernameCell.textContent = username;
					})
					.catch(error => {
						console.error('Error fetching username:', error);
						usernameCell.textContent = 'N/A';
					});
				row.appendChild(usernameCell);

                // Date
                const dateCell = document.createElement('td');
                const dateInput = document.createElement('input');
                dateInput.setAttribute('type', 'date');
                dateInput.setAttribute('value', booking.OrderDate);
                dateCell.appendChild(dateInput);
                row.appendChild(dateCell);

                // Address
                const addressCell = document.createElement('td');
                const addressInput = document.createElement('input');
                addressInput.setAttribute('type', 'text');
                addressInput.setAttribute('value', booking.OrderAddress);
                addressCell.appendChild(addressInput);
                row.appendChild(addressCell);

                // Adult Guests
                const adultGuestsCell = document.createElement('td');
                const adultGuestsInput = document.createElement('input');
                adultGuestsInput.setAttribute('type', 'text');
                adultGuestsInput.setAttribute('value', booking.AdultGuests);
                adultGuestsCell.appendChild(adultGuestsInput);
                row.appendChild(adultGuestsCell);

                // Child Guests
                const childGuestsCell = document.createElement('td');
                const childGuestsInput = document.createElement('input');
                childGuestsInput.setAttribute('type', 'text');
                childGuestsInput.setAttribute('value', booking.ChildGuests);
                childGuestsCell.appendChild(childGuestsInput);
                row.appendChild(childGuestsCell);

				// Update Button
				const updateCell = document.createElement('td');
				const updateButton = document.createElement('button');
				updateButton.textContent = 'Update';
				updateButton.addEventListener('click', function() {
					console.log('Update button clicked');
					// Retrieve updated values from input fields
					const updatedOrderDate = dateInput.value;
					const updatedOrderAddress = addressInput.value;
					const updatedAdultGuests = adultGuestsInput.value;
					const updatedChildGuests = childGuestsInput.value;

					console.log('Updated values:', updatedOrderDate, updatedOrderAddress, updatedAdultGuests, updatedChildGuests);

					// Call function to update booking
					updateBooking(booking.OrderID, updatedOrderDate, updatedOrderAddress, updatedAdultGuests, updatedChildGuests);
				});
				updateCell.appendChild(updateButton);
				row.appendChild(updateCell);

                // Delete Button
                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function() {
                    // Call function to delete booking
                    deleteBooking(booking.OrderID);
                });
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                table.appendChild(row);
            });

            // Append table to content area
            contentArea.appendChild(table);

            // Add New Button
            const addNewButton = document.createElement('button');
            addNewButton.textContent = 'Add New Booking';
            addNewButton.addEventListener('click', function() {
                // Show the form fields for adding a new booking
				showAddNewBookingForm();
            });
            contentArea.appendChild(addNewButton);

            // Remove 'active' class from all tabs
            const navItems = document.querySelectorAll('.menu li');
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            // Add 'active' class to the selected tab
            document.getElementById('bookings-btn').classList.add('active');
        })
        .catch(error => {
            console.error('Error loading bookings:', error);
            // Handle error
        });
}

// Function to submit new booking
function submitNewBooking(username, date, address, adultGuests, childGuests) {
    // Prepare FormData with new booking values
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('OrderDate', date);
    formData.append('OrderAddress', address);
    formData.append('AdultGuests', adultGuests);
    formData.append('ChildGuests', childGuests);

    // Send a POST request to add_booking.php
    fetch('../php/add_booking.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add booking. Username not found.');
        }
        return response.text(); // Get raw response content
    })
    .then(text => {
        console.log('Response from server:', text); // Log the raw response
        // Check if the response indicates success or failure
        if (text.includes('successfully')) {
            alert('Booking added successfully');
            // Optionally, you can reload the page or perform any other actions after successful submission
        } else {
            throw new Error(text); // Throw custom error containing server response
        }
    })
    .catch(error => {
        console.error('Error adding booking:', error);
        // Display error message in pop-up
        alert('Error: ' + error.message);
    });
}






// Create "Add New Booking" button
const addNewButton = document.createElement('button');
addNewButton.textContent = 'Add New Booking';
addNewButton.addEventListener('click', function() {
    // Add functionality for the button click event here
});

// Function to fetch username based on CustID
function fetchUsername(custID) {
    return new Promise((resolve, reject) => {
        fetch('../php/fetch_username.php?custID=' + custID)
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    resolve(data.username);
                } else {
                    reject('Username not found');
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}


// Function to delete a booking from the database
function deleteBooking(orderID) {
    fetch('php/delete_booking.php', {
        method: 'POST',
        body: JSON.stringify({ OrderID: orderID }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete booking');
        }
        return response.json(); // Assuming the server responds with a success message
    })
    .then(responseData => {
        alert('Booking deleted successfully');
        // Reload all bookings after successful deletion
        loadAllBookings();
    })
    .catch(error => {
        console.error('Error deleting booking:', error);
        // Handle error
    });
}

// Function to update a booking in the database
function updateBooking(orderID, orderDate, orderAddress, adultGuests, childGuests) {
    // Prepare FormData with updated values
    const formData = new FormData();
    formData.append('OrderID', orderID);
    formData.append('OrderDate', orderDate);
    formData.append('OrderAddress', orderAddress);
    formData.append('AdultGuests', adultGuests);
    formData.append('ChildGuests', childGuests);

    // Send a POST request to update_booking.php
    fetch('../php/update_booking.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update booking');
        }
        return response.text(); // Get raw response content
    })
    .then(text => {
        console.log('Response from server:', text); // Log the raw response
        // Check if the response indicates success or failure
        if (text.includes('successfully')) {
            alert('Booking updated successfully');
            // Redirect to the admin page after successful update
            window.location.href = 'admin.php';
        } else {
            throw new Error('Failed to update booking: ' + text);
        }
    })
    .catch(error => {
        console.error('Error updating booking:', error);
        // Handle error
    });
}

// Function to show the form fields for adding a new booking
function showAddNewBookingForm() {
    // Create form element
    const form = document.createElement('form');

    // Username input
    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('placeholder', 'Username');
    form.appendChild(usernameInput);

    // Date input
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    form.appendChild(dateInput);

    // Address input
    const addressInput = document.createElement('input');
    addressInput.setAttribute('type', 'text');
    addressInput.setAttribute('placeholder', 'Address');
    form.appendChild(addressInput);

    // Adult Guests input
    const adultGuestsInput = document.createElement('input');
    adultGuestsInput.setAttribute('type', 'text');
    adultGuestsInput.setAttribute('placeholder', 'Adults');
    form.appendChild(adultGuestsInput);

    // Child Guests input
    const childGuestsInput = document.createElement('input');
    childGuestsInput.setAttribute('type', 'text');
    childGuestsInput.setAttribute('placeholder', 'Children');
    form.appendChild(childGuestsInput);

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', function() {
        const username = usernameInput.value;
        const date = dateInput.value;
        const address = addressInput.value;
        const adultGuests = adultGuestsInput.value;
        const childGuests = childGuestsInput.value;

        // Call function to submit new booking
        submitNewBooking(username, date, address, adultGuests, childGuests);
    });
    form.appendChild(submitButton);

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = function() {
        form.reset(); // Clear form fields
        form.style.display = 'none'; // Hide the form
    };
    form.appendChild(cancelButton);

    // Append form to content area
    const contentArea = document.getElementById('content-area');
    contentArea.appendChild(form);
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

// Function to load users
function loadUsers() {
    // Fetch all users from the server
    fetch('../php/fetch_all_users.php')
        .then(response => response.json())
        .then(users => {
            const contentArea = document.getElementById('content-area');
            contentArea.innerHTML = ''; // Clear existing content

            // Create table element
            const table = document.createElement('table');
            table.classList.add('user-table');

            // Create table header row
            const headerRow = document.createElement('tr');
            const headers = ['Username', 'First Name', 'Last Name', 'Phone', 'Email', 'Actions'];
            headers.forEach(headerText => {
                const headerCell = document.createElement('th');
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });
            table.appendChild(headerRow);

            // Loop through each user and create table rows
            users.forEach(user => {
                const row = document.createElement('tr');

                // Hidden input for CustID
                const custIDInput = document.createElement('input');
                custIDInput.setAttribute('type', 'hidden');
                custIDInput.setAttribute('name', 'CustID');
                custIDInput.value = user.CustID;
                row.appendChild(custIDInput);

                // Username
                const usernameCell = document.createElement('td');
                const usernameInput = document.createElement('input');
                usernameInput.setAttribute('type', 'text');
                usernameInput.value = user.Username;
                usernameCell.appendChild(usernameInput);
                row.appendChild(usernameCell);

                // First Name
                const firstNameCell = document.createElement('td');
                const firstNameInput = document.createElement('input');
                firstNameInput.setAttribute('type', 'text');
                firstNameInput.value = user.FName;
                firstNameCell.appendChild(firstNameInput);
                row.appendChild(firstNameCell);

                // Last Name
                const lastNameCell = document.createElement('td');
                const lastNameInput = document.createElement('input');
                lastNameInput.setAttribute('type', 'text');
                lastNameInput.value = user.LName;
                lastNameCell.appendChild(lastNameInput);
                row.appendChild(lastNameCell);

                // Phone
                const phoneCell = document.createElement('td');
                const phoneInput = document.createElement('input');
                phoneInput.setAttribute('type', 'text');
                phoneInput.value = user.Phone;
                phoneCell.appendChild(phoneInput);
                row.appendChild(phoneCell);

                // Email
                const emailCell = document.createElement('td');
                const emailInput = document.createElement('input');
                emailInput.setAttribute('type', 'email');
                emailInput.value = user.Email;
                emailCell.appendChild(emailInput);
                row.appendChild(emailCell);

                // Actions: Update Button
                const updateCell = document.createElement('td');
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.addEventListener('click', function() {
                    console.log('Update button clicked for user:', user);
                    // Call function to update user
                    updateUser(row);
                });
                updateCell.appendChild(updateButton);
                row.appendChild(updateCell);

                // Actions: Delete Button
                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function() {
                    console.log('Delete button clicked for user:', user);
                    // Call function to delete user
                    deleteUser(user.CustID);
                });
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                table.appendChild(row);
            });

            // Append table to content area
            contentArea.appendChild(table);

            // Add New Button
            const addNewButton = document.createElement('button');
            addNewButton.textContent = 'Add New User';
            addNewButton.addEventListener('click', function() {
                // Show the form fields for adding a new user
                showAddNewUserForm();
            });
            contentArea.appendChild(addNewButton);
        })
        .catch(error => {
            console.error('Error loading users:', error);
            // Handle error
        });

    // Display message about managing users
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



// Function to show the form fields for adding a new user
function showAddNewUserForm() {
    // Create form element
    const form = document.createElement('form');
    form.classList.add('add-user-form'); // Add a class for styling

    // Username input
    const usernameInput = createInput('text', 'Username');
    form.appendChild(usernameInput);

    // First Name input
    const firstNameInput = createInput('text', 'First Name');
    form.appendChild(firstNameInput);

    // Last Name input
    const lastNameInput = createInput('text', 'Last Name');
    form.appendChild(lastNameInput);

    // Phone input
    const phoneInput = createInput('text', 'Phone');
    form.appendChild(phoneInput);

    // Email input
    const emailInput = createInput('email', 'Email');
    form.appendChild(emailInput);

    // Password input
    const passwordInput = createInput('password', 'Password');
    form.appendChild(passwordInput);

    // Submit button
    const submitButton = createButton('Submit', function(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        const newUser = {
            UserID: null, // Set to null for new user
            Username: usernameInput.value,
            FName: firstNameInput.value,
            LName: lastNameInput.value,
            Phone: phoneInput.value,
            Email: emailInput.value,
            Password: passwordInput.value
            // Add additional user details as needed
        };

        // Call function to submit new user
        submitNewUser(newUser);
    });
    form.appendChild(submitButton);

    // Cancel button
    const cancelButton = createButton('Cancel', function(event) {
        // Prevent default button behavior
        event.preventDefault();
        // Clear the content area
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '';
        // Reload users after canceling
        loadUsers();
    });
    form.appendChild(cancelButton);

    // Append form to content area
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = ''; // Clear existing content
    contentArea.appendChild(form);
}

// Helper function to create input fields
function createInput(type, placeholder) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    return input;
}

// Helper function to create buttons
function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}


// Function to submit new user
function submitNewUser(newUser) {
    console.log('Submitting new user:', newUser); // Log the new user data
    // Make fetch request to update_user.php
    fetch('../php/update_user.php', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return response.json();
    })
    .then(data => {
        // Display success message to the user
        alert('User updated successfully');
        // Reload users after successful submission
        loadUsers();
    })
    .catch(error => {
        // Display error message to the user
        console.error('Error updating user:', error);
        alert('Failed to update user. Please try again.');
    });
}

// Toggle the hamburger menu
document.getElementById('menu-toggle').addEventListener('click', function() {
    this.classList.toggle("change");
    document.getElementById('main-nav').classList.toggle("active");
});

// Add event listener to window to load bookings and highlight the default tab when the page loads
window.addEventListener('load', function() {
    loadAllBookings(); // Load bookings content by default
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
