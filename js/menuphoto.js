// Initialize the variable to keep track of the currently highlighted image
let currentTopDiv = null;

document.querySelectorAll('.b-collage div').forEach(div => {
    div.addEventListener('mouseover', function() {
        // Reset the z-index and transformations for all images to a baseline
        document.querySelectorAll('.b-collage div').forEach(el => {
            el.style.zIndex = '1'; // Set all to the lowest level initially
            if (el.id === 'mainImage') {
                el.style.transform = 'rotate(-30deg)';
            } else if (el.id === 'sideImage') {
                el.style.transform = 'rotate(30deg)';
            } else if (el.id === 'underImage') {
                el.style.transform = 'none';
            }
        });

        // Set the z-index of the non-hovered images specifically to keep them below the hovered image
        if (this.id === 'mainImage') {
            document.getElementById('sideImage').style.zIndex = '2';
            document.getElementById('underImage').style.zIndex = '2';
        } else if (this.id === 'sideImage') {
            document.getElementById('mainImage').style.zIndex = '2';
            document.getElementById('underImage').style.zIndex = '2';
        } else if (this.id === 'underImage') {
            document.getElementById('mainImage').style.zIndex = '2';
            document.getElementById('sideImage').style.zIndex = '2';
        }

        // Highlight the hovered image by setting its z-index higher than the others
        this.style.zIndex = '3';  // Highest, as it's the currently active image
        // Apply scaling and maintain rotation for visual consistency
        if (this.id === 'mainImage') {
            this.style.transform = 'scale(1.1) rotate(-30deg)';
        } else if (this.id === 'sideImage') {
            this.style.transform = 'scale(1.1) rotate(30deg)';
        } else if (this.id === 'underImage') {
            this.style.transform = 'scale(1.1)';
        }
    });
});