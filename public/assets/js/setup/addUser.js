console.log(`addUser.js | loaded`);
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
  console.log(`submitting`);
  // const emailInput = document.getElementById("emailInput");
  // const emailInputFeedback = document.getElementById("emailInputFeedback");
  const pass1Input = document.getElementById("pass1Input");
  const pass1InputFeedback = document.getElementById("pass1InputFeedback");
  const pass2Input = document.getElementById("pass2Input");
  const pass2InputFeedback = document.getElementById("pass2InputFeedback");

  let fieldsValid = true;

  // if (emailInput.value.trim() === "") {
  //   showInvalidFeedback(
  //     emailInput,
  //     emailInputFeedback,
  //     `Please fill out this field`
  //   );
  //   fieldsValid = false;
  // } else {
  //   showValidFeedback(emailInput);
  // }

  if (pass1Input.value === "") {
    showInvalidFeedback(
      pass1Input,
      pass1InputFeedback,
      `Please fill out this field`
    );
    fieldsValid = false;
  } else {
    showValidFeedback(pass1Input);
  }
  if (pass2Input.value === "") {
    showInvalidFeedback(
      pass2Input,
      pass2InputFeedback,
      `Please fill out this field`
    );
    fieldsValid = false;
  } else {
    showValidFeedback(pass2Input);
  }

  if (pass1Input.value !== pass2Input.value) {
    showInvalidFeedback(
      pass1Input,
      pass1InputFeedback,
      `Both Passwords must match!`
    );
    showInvalidFeedback(
      pass2Input,
      pass2InputFeedback,
      `Both Passwords must match!`
    );
  }
  if (fieldsValid) {
    const code = window.location.pathname.split("/")[4];
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "CSRF-Token": token,
      },
      body: JSON.stringify({
        password: pass1Input.value,
        code,
      }),
    };
    fetch(`/setup/user/create`, options)
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
      });
  }
});
