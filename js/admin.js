document.getElementById('bookings-btn').addEventListener('click', function() {
    loadBookings();
});

document.getElementById('rasaimenu-btn').addEventListener('click', function() {
    loadRasaiMenu();
});

document.getElementById('Users-btn').addEventListener('click', function() {
    loadUsers();
});

function loadBookings() {
    document.getElementById('content-area').innerHTML = `
        <div class="details-box">
            <h2>Manage Bookings</h2>
            <p>Here you can view and manage all bookings.</p>
        </div>
    `;
}

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

let dropdownMenu; // Define dropdownMenu in a higher scope

// Load Rasai Menu function
function loadRasaiMenu() {
    // Fetch menu options from the database and populate the dropdown menu
    fetchMenuOptions().then(menuOptions => {
        const form = document.createElement('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            // Handle form submission if needed
        });

        const dropdownMenu = document.createElement('select');
        dropdownMenu.setAttribute('id', 'menuOptionSelect');
		

        // Add a default option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select Menu Option';
        dropdownMenu.appendChild(defaultOption);

        // Populate dropdown with menu options
        menuOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.MenuID;
            optionElement.textContent = option.MenuName;
            dropdownMenu.appendChild(optionElement);
        });

        // Add event listener to dropdown menu
		dropdownMenu.addEventListener('change', function() {
			console.log('Dropdown menu value changed'); // Check if this message appears in the console
			const selectedMenuID = this.value;
			console.log('Selected menu ID:', selectedMenuID); // Log the selected menu ID
			const selectedMenu = menuOptions.find(option => option.MenuID === parseInt(selectedMenuID));

			// Call function to populate form with selected menu details
			populateForm(selectedMenu, form);
		});

        // Add the dropdown menu to the form
        form.appendChild(dropdownMenu);

        // Add a submit button to the form
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Update';
        submitButton.addEventListener('click', function() {
            // Call function to handle form submission
            updateMenu(formData);
        });
        form.appendChild(submitButton);

        // Append the form to the content-area
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '';
        contentArea.appendChild(form);
    }).catch(error => {
        console.error('Error loading Rasai menu:', error);
        // Handle error
    });
}

// Function to handle form submission
function updateMenu(formData) {
    // Get the selected menu ID from the dropdown menu
    const menuOptionSelect = document.getElementById('menuOptionSelect');
	console.log('Dropdown menu value:', menuOptionSelect.value);
    const menuID = menuOptionSelect ? menuOptionSelect.value : null;

    console.log('Selected menu ID:', menuID); // Log the selected menu ID

    // Check if a menu option is selected
    if (!menuID) {
        console.error('No menu option selected');
        return; // Exit the function if no menu option is selected
    }

    // Select only the input fields that we want to include in the FormData
    formData.append('MenuID', menuID);

    // Get the values of the editable input fields if they exist
    const menuNameInput = document.getElementById('MenuName');
    if (menuNameInput) {
        formData.append('MenuName', menuNameInput.value);
    }

    const menuDescInput = document.getElementById('MenuDesc');
    if (menuDescInput) {
        formData.append('MenuDesc', menuDescInput.value);
    }

    const menuPriceInput = document.getElementById('MenuPrice');
    if (menuPriceInput) {
        formData.append('MenuPrice', menuPriceInput.value);
    }
	console.log('Form data:', formData);
	console.log('Menu Name:', menuNameInput ? menuNameInput.value : 'Not found');
	console.log('Menu Description:', menuDescInput ? menuDescInput.value : 'Not found');
	console.log('Menu Price:', menuPriceInput ? menuPriceInput.value : 'Not found');

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
        input.setAttribute('name', key); // Ensure name attribute matches PHP keys
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


function loadUsers() {
    document.getElementById('content-area').innerHTML = `
        <div class="details-box">
            <h2>Manage Users</h2>
            <p>Here you can manage user accounts, set permissions, and view user activity.</p>
        </div>
    `;
}
// Toggle the hamburger menu
document.getElementById('menu-toggle').addEventListener('click', function() {
    this.classList.toggle("change");
    document.getElementById('main-nav').classList.toggle("active");
});


