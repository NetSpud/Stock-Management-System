console.log(`login.js | loaded`);
const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");
const showInvalidFeedback = (el, feedback, msg) => {
  if (el.classList.contains("is-valid")) {
    el.classList.remove("is-valid");
  }
  if (!el.classList.contains("is-invalid")) {
    el.classList.add("is-invalid");
  }
  feedback.innerHTML = msg;
};
const showValidFeedback = (el) => {
  if (el.classList.contains("is-invalid")) {
    el.classList.remove("is-invalid");
  }
  if (!el.classList.contains("is-valid")) {
    el.classList.add("is-valid");
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("emailInput");
  const emailInputFeedback = document.getElementById("emailInputFeedback");
  const passwordInput = document.getElementById("passwordInput");
  const passwordInputFeedback = document.getElementById(
    "passwordInputFeedback"
  );
  let fieldsValid = true;
  if (emailInput.value.trim() === "") {
    showInvalidFeedback(
      emailInput,
      emailInputFeedback,
      `Please fill out this field`
    );
    fieldsValid = false;
  } else {
    showValidFeedback(emailInput);
  }
  if (passwordInput.value === "") {
    showInvalidFeedback(
      passwordInput,
      passwordInputFeedback,
      `Please fill out this field`
    );
    fieldsValid = false;
  } else {
    showValidFeedback(passwordInput);
  }

  if (fieldsValid) {
    const options = {
      method: "POST",
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: passwordInput.value,
      }),
      headers: {
        "Content-Type": "Application/json",
        "CSRF-Token": token,
      },
    };
    fetch("/login", options)
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
        if (d.success) {
          window.location.href = d.success;
        }
      });
  }
});
