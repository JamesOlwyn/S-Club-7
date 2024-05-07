document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('change'); // Animates the menu icon
        mainNav.classList.toggle('active'); // Toggles visibility of the navigation drawer
    });
});

