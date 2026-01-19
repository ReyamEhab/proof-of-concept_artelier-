const API_URL = "http://localhost:5000/api/auth";
const user = JSON.parse(localStorage.getItem("user")); // logged-in user

const title = document.getElementById("title");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password"); // not used
const actionBtn = document.getElementById("actionBtn");
const switchMsg = document.getElementById("switchMsg");
const message = document.getElementById("message");

let isSignup = false;

/* SWITCH FORM */
switchMsg.addEventListener("click", () => {
  isSignup = !isSignup;

  title.textContent = isSignup ? "Create account" : "Welcome back";
  actionBtn.querySelector("span").textContent = isSignup ? "Sign up" : "Log in";
  nameInput.classList.toggle("hidden");

  switchMsg.textContent = isSignup ? "Log in" : "Register here";
  message.textContent = "";
});

/* SUBMIT */
actionBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const name = nameInput.value.trim();

  if (isSignup && (!name || !email)) {
    message.textContent = "Please enter name and email";
    return;
  }

  if (!email) {
    message.textContent = "Email is required";
    return;
  }

  try {
    const res = await fetch(
      `${API_URL}/${isSignup ? "signup" : "login"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSignup ? { name, email } : { email }
        )
      }
    );

    const data = await res.json();
    message.textContent = data.message;

    if (!res.ok) return;

    /* ✅ SAVE USER IN LOCALSTORAGE */
    localStorage.setItem("user", JSON.stringify(data.user));

setTimeout(() => {
  window.location.href = "index.html";
}, 1000);

  } catch (err) {
    console.error(err);
    message.textContent = "Server error";
  }
});



