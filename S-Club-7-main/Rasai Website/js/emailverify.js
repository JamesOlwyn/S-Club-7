document.getElementById("myForm").addEventListener("submit", function(event){
    event.preventDefault(); // Prevent default form submission
    document.getElementById("myForm").style.display = "none"; // Hide the form
    document.getElementById("thankYouMsg").style.display = "block"; // Show thank you message
  });
  
  document.querySelector('input[type="email"]').addEventListener('input', function() {
      var emailField = this;
      var isValid = emailField.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);
      
      if (isValid) {
          emailField.classList.add("is-valid");
          emailField.classList.remove("is-invalid");
      } else {
          emailField.classList.add("is-invalid");
          emailField.classList.remove("is-valid");
      }
  });
  
  document.querySelector('input[type="tel"]').addEventListener('input', function() {
      var phoneField = this;
      // Adjust the pattern as per your phone number format requirement
      var isValid = phoneField.value.match(/^\d{3}-\d{3}-\d{4}$/);
      
      if (isValid) {
          phoneField.classList.add("is-valid");
          phoneField.classList.remove("is-invalid");
      } else {
          phoneField.classList.add("is-invalid");
          phoneField.classList.remove("is-valid");
      }
  });