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

function loadRasaiMenu() {
    document.getElementById('content-area').innerHTML = `
        <div class="details-box">
            <h2>Manage Menu</h2>
            <p>Here you can update the Rasai menu items.</p>
        </div>
    `;
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


