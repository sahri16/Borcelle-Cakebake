// Get the cursor element
const cursor = document.querySelector('.cursor');

// Add event listener to track mouse movements
document.addEventListener('mousemove', (e) => {
    // Get the mouse position
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Move the cursor circle to follow the mouse
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    cursor.style.display = 'block'; // Show the circle when moving the mouse
});

// Hide the cursor circle when the mouse leaves the browser window
document.body.addEventListener('mouseleave', () => {
    cursor.style.display = 'none'; // Hide the cursor circle
});

// Show the cursor again if the mouse re-enters the browser window
document.body.addEventListener('mouseenter', () => {
    cursor.style.display = 'block'; // Show the cursor circle
});
