// Get all the color-box elements
const boxes = document.querySelectorAll('.box-container .color-box');

// Add a click event listener to each box
boxes.forEach(box => {
    box.addEventListener('click', function() {
        // Toggle active class for the clicked box
        this.classList.toggle('active');
        
        // Optionally, remove active class from all other boxes
        boxes.forEach(b => {
            if (b !== this) b.classList.remove('active'); // Ensure only this box can be active or inactive at one time
        });
    });
});