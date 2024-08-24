const form = document.getElementById("contactForm");
const email = document.getElementById("email");

email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Emails must be in the form name@email.com");
  } else {
    email.setCustomValidity("");
  }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.innerHTML = `<div class="thanks"><h2>Thank you for contacting us!</h2></div>`
});