document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
});

// Add event listeners to tabs
document.getElementById('details-btn').addEventListener('click', function() {
    loadDetails(); // Load details content
    highlightTab('details-btn'); // Highlight the Details tab
});

document.getElementById('booking-btn').addEventListener('click', function() {
    loadBookingForm(); // Load booking form content
    highlightTab('booking-btn'); // Highlight the Booking tab
});

document.getElementById('previous-btn').addEventListener('click', function() {
    loadPreviousBookings(); // Load previous bookings content
    highlightTab('previous-btn'); // Highlight the Previous tab
});

document.getElementById('message-btn').addEventListener('click', function() {
    loadMessageRasai(); // Load message content
    highlightTab('message-btn'); // Highlight the Message tab
});

// Function to highlight the active tab
function highlightTab(tabId) {
    // Remove 'active' class from all tabs
    const tabItems = document.querySelectorAll('.menu li');
    tabItems.forEach(item => {
        item.classList.remove('active');
    });
    // Add 'active' class to the selected tab
    document.getElementById(tabId).classList.add('active');
}

// Add event listener to window to load details and highlight the default tab when the page loads
window.addEventListener('load', function() {
    loadDetails(); // Load details content by default
    highlightTab('details-btn'); // Highlight the Details tab by adding 'active' class
});


function loadBookingForm() {
    document.getElementById('content-area').innerHTML = `
        <div class="details-box">
            <form id="booking-form">
				<div class="form-group">
					<label for="booking-firstname">First Name</label>
					<input type="text" id="booking-firstname" value="">
				</div>
				<div class="form-group">
					<label for="booking-lastname">Last Name</label>
					<input type="text" id="booking-lastname" value="">
				</div>
                <div class="form-group">
                    <label for="booking-phone">Phone Number</label>
                    <input type="text" id="booking-phone" value="">
                </div>
                <div class="form-group">
                    <label for="booking-email">Email</label>
                    <input type="email" id="booking-email" value="">
                </div>
                <div class="form-group">
                    <label for="event-address">Event Address</label>
                    <input type="text" id="event-address" placeholder="Type address or select from map">
                    <div id="map" style="width: 100%; height: 200px; margin-top: 10px;"></div>
                </div>
                <div class="form-group">
                    <label for="event-date">Event Date</label>
                    <input type="date" id="event-date">
                </div>
                <div class="form-group">
                    <label for="adult-guests">Adult Guests</label>
                    <input type="number" id="adult-guests" min="0">
                </div>
                <div class="form-group">
                    <label for="child-guests">Child Guests</label>
                    <input type="number" id="child-guests" min="0">
                </div>
                <div class="form-actions">
                    <button type="button" onclick="submitBooking()">Submit Booking</button>
                </div>
            </form>
        </div>
    `;
    initMap(); // Initialize the Google Maps
}

function loadPreviousBookings() {
    document.getElementById('content-area').innerHTML = `
        <div class="booking-history">
            <div class="booking-header">
                <span class="event-title">Event</span>
                <span class="date-title">Date</span>
            </div>
            <div class="booking-details">
                <span class="event">Specialty Briyani</span>
                <span class="date">03/01/2024</span>
            </div>
            <div class="booking-details">
                <span class="event">Village Menu</span>
                <span class="date">16/11/2023</span>
            </div>
            <div class="booking-details">
                <span class="event">Village Menu</span>
                <span class="date">26/08/2023</span>
            </div>
        </div>
    `;
}




function loadMessageRasai() {
    document.getElementById('content-area').innerHTML = `
        <div class="message-section">
        <h2>Message Rasai</h2>
            <div class="message-form-container"> <!-- New container for both fields -->
                <form id="message-form">
                    <div class="message-form-group">
                        <label for="message-title">Title/Issue</label>
                        <input type="text" id="message-title" placeholder="Enter title of your issue">
                    </div>
                    <div class="message-form-group">
                        <label for="message-content">Message</label>
                        <textarea id="message-content" placeholder="Write your message here" rows="5"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" onclick="sendMessage()">Send Message</button>
                    </div>
                </form>
            </div>
            <h2>Previous Messages</h2>
            <div class="message-log-section">
                <div class="search-functions">
                    <input type="text" id="search-title" placeholder="Search by title" onkeyup="searchMessages()">
                    <button type="button" onclick="performSearch()">Search</button>
                    <select onchange="sortMessages(this.value)">
                        <option value="asc">Date Ascending</option>
                        <option value="desc">Date Descending</option>
                    </select>
                </div>
                <div class="search-results-container" id="search-results-container">
                    <!-- Search results will be dynamically inserted here -->
                </div>
                <div class="log-container" id="log-container">
                    <!-- Messages will be dynamically inserted here -->
                </div>
            </div>
        </div>
    `;
    // loadMessages(); // Load existing messages (this function needs to be implemented)
}

function sendMessage() {
    const title = document.getElementById('message-title').value.trim();
    const content = document.getElementById('message-content').value.trim();
    if (!title) {
        alert("Please provide a title for your message.");
        return;
    }
    const date = new Date().toLocaleDateString('en-GB');
    addMessageToLog(title, content, date);
    document.getElementById('message-title').value = '';
    document.getElementById('message-content').value = '';
    alert('Message sent successfully!');  // Example of a simple success message
}

function addMessageToLog(title, content, date) {
    const logContainer = document.getElementById('log-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-entry';
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-title-display">${title}</span>
            <span class="message-date">${date}</span>
        </div>
        <div class="message-content-display">${content}</div>
    `;
    logContainer.prepend(messageDiv); // Adds the new message at the top
}

function performSearch() {
    const searchQuery = document.getElementById('search-title').value.trim().toLowerCase();
    const messages = document.querySelectorAll('.message-entry');
    const searchResultsContainer = document.getElementById('search-results-container');

    // Clear previous results before showing new ones
    searchResultsContainer.innerHTML = ''; 

    // Search and display results
    messages.forEach(message => {
        const title = message.querySelector('.message-title-display').textContent.toLowerCase();
        if (title.includes(searchQuery)) {
            const result = message.cloneNode(true);
            searchResultsContainer.appendChild(result);
        }
    });

    // If no results found, display a message
    if (searchResultsContainer.innerHTML === '') {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
    }
}
function sortMessages(order) {
    const logContainer = document.getElementById('log-container');
    let messages = Array.from(logContainer.getElementsByClassName('message-entry'));

    messages.sort((a, b) => {
        // Extract date from the innerHTML, assuming the format dd/mm/yyyy
        const dateA = getDateFromText(a.querySelector('.message-date').textContent);
        const dateB = getDateFromText(b.querySelector('.message-date').textContent);

        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Clear the current content
    logContainer.innerHTML = '';

    // Append sorted messages
    messages.forEach(message => logContainer.appendChild(message));
}

// Helper function to convert UK date format dd/mm/yyyy to a Date object
function getDateFromText(dateStr) {
    const parts = dateStr.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);  // Note: months are 0-based
}


// Initial load of 'My Details'
loadDetails();

function initMap() {
    // Placeholder for Google Maps API initialization
    document.getElementById('map').innerHTML = '<p>Map would appear here.</p>';
}

function updateDetails() {
    // Get form data
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim(); // Include new password field

    // Prepare data to send to the server
    const formData = new FormData();
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password); // Append new password

    // Send data to the server using fetch
    fetch('php/update_user_details.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Details updated successfully!');
        } else {
            alert('Failed to update details. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error updating user details:', error);
        alert('An error occurred while updating details. Please try again later.');
    });
}





function submitBooking() {
    alert('Booking submitted!');
}

function cancelBooking() {
    alert('Booking cancelled!');
}

function loadDetails() {
    // Fetch user details from the server
    fetch('php/get_user_details.php')
        .then(response => response.json())
        .then(data => {
            // Check if data contains user details
            if (data && Object.keys(data).length > 0) {
                // Extract user details from data object
                const { firstname, lastname, phone, email } = data;

                // Fill the My Details form with user details
                document.getElementById('content-area').innerHTML = `
                    <div class="details-box">
                        <form id="user-details-form">
                            <div class="form-group">
                                <label for="firstname">First Name</label>
                                <input type="text" id="firstname" value="${firstname}">
                            </div>
                            <div class="form-group">
                                <label for="lastname">Last Name</label>
                                <input type="text" id="lastname" value="${lastname}">
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="text" id="phone" value="${phone}">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" value="${email}">
                            </div>
							<div class="form-group">
								<label for="password">New Password:</label>
								<input type="password" id="password" name="password">
							</div>
                            <div class="form-actions">
                                <button type="button" onclick="updateDetails()">Update Details</button>
                            </div>
                        </form>
                    </div>
                `;
            } else {
                // If no user details found, display an empty form
                document.getElementById('content-area').innerHTML = `
                    <!-- Updated "My Details" form -->
                    <div class="details-box">
                        <form id="user-details-form">
                            <div class="form-group">
                                <label for="firstname">First Name</label>
                                <input type="text" id="firstname" value="">
                            </div>
                            <div class="form-group">
                                <label for="lastname">Last Name</label>
                                <input type="text" id="lastname" value="">
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="text" id="phone" value="">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" value="">
                            </div>
                            <div class="form-actions">
                                <button type="button" onclick="updateDetails()">Update Details</button>
                            </div>
                        </form>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
}




