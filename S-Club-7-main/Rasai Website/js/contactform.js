document.getElementById("myForm").addEventListener("submit", function(event){
  event.preventDefault(); // Prevent default form submission
  document.getElementById("myForm").style.display = "none"; // Hide the form
  document.getElementById("thankYouMsg").style.display = "block"; // Show thank you message
});