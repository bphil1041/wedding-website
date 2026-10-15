// --- PASSWORD PROTECTION ---
const CORRECT_PASSWORD = "beninem2027";

document
  .getElementById("password-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const inputVal = document.getElementById("site-password").value;
    const errorMsg = document.getElementById("password-error");

    if (inputVal === CORRECT_PASSWORD) {
      document.getElementById("password-overlay").style.display = "none";
      document.getElementById("main-content").style.display = "block";
      sessionStorage.setItem("wedding_auth", "true");
    } else {
      errorMsg.innerText = "Incorrect password. Please check your invitation!";
    }
  });

// Auto-unlock if already authenticated during this browser session
if (sessionStorage.getItem("wedding_auth") === "true") {
  document.getElementById("password-overlay").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}

// 1. Countdown Timer (Target Date: October 27, 2027)
const weddingDate = new Date("October 27, 2027 16:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("countdown-timer").innerHTML =
      "<h3>The day is here!</h3>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 2. Simple Form Handling
document.getElementById("rsvp-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const status = document.getElementById("form-status");
  status.style.marginTop = "1rem";
  status.style.color = "green";
  status.innerText = "Thank you! Your RSVP has been received.";
  this.reset();
});

// 3. Fade-in Sections on Scroll
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("fade-in-section");
  observer.observe(section);
});
