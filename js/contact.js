// ==========================================================
// CONTACT PAGE LOGIC (js/contact.js)
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value;

      if (typeof showToast === "function") {
        showToast(`Thank you ${name}, your message has been sent!`);
      } else {
        alert(`Thank you ${name}, your message has been sent!`);
      }

      contactForm.reset();
    });
  }
});