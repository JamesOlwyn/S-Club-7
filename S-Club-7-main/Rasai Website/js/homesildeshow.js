function openOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'flex';
}

function closeOverlay(event, overlayId) {
    if (event.target.className === 'overlay-content' || event.target.className === 'close-btn') {
        document.getElementById(overlayId).style.display = 'none';
    }
    event.stopPropagation();
}