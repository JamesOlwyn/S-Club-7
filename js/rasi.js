document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', () => {
        if (mainNav.style.width == '0px' || mainNav.style.width == '') {
            mainNav.style.width = '250px';
        } else {
            mainNav.style.width = '0px';
        }
    });
});