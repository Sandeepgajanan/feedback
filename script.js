document.getElementById("feedbackForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const rating = document.querySelector('input[name="rating"]:checked');
  const feedback = document.getElementById("feedback").value.trim();

  // Validation
  if (!name || !email || !rating || !feedback) {
      alert("Please fill out all fields.");
      return;
  }

  if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  // Create a new response card
  const responsesContainer = document.querySelector(".cards");
  const newCard = document.createElement("div");
  newCard.classList.add("card");

  // Generate star display based on rating
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
      starsHTML += i <= rating.value ? "★" : "☆";
  }

  // Escape HTML to prevent XSS attacks
  newCard.innerHTML = `
      <h2>${escapeHTML(name)}</h2>
      <h3>${escapeHTML(email)}</h3>
      <p>${escapeHTML(feedback)}</p>
      <span class="ratings">${starsHTML}</span>
  `;

  // Append the new card to the container
  responsesContainer.prepend(newCard);

  // Optionally limit the number of displayed responses to 10
  const maxResponses = 10;
  if (responsesContainer.children.length > maxResponses) {
      responsesContainer.removeChild(responsesContainer.lastChild);
  }

  // Reset form
  document.getElementById("feedbackForm").reset();
});

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to escape HTML for security
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
