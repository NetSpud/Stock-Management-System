console.log(`user.js | loaded`);
const token = document
  .querySelector('meta[name="csrf-token"')
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
  const emailAddress = document.getElementById("emailAddress");
  const emailAddressFeedback = document.getElementById("emailAddressFeedback");

  let fieldsValid = true;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailAddress.value.trim() === "") {
    showInvalidFeedback(
      emailAddress,
      emailAddressFeedback,
      `Please fill out this field`
    );
    fieldsValid = false;
  } else if (!re.test(String(emailAddress.value.trim()).toLowerCase())) {
    showInvalidFeedback(
      emailAddress,
      emailAddressFeedback,
      `Please provide a valid email address`
    );
    fieldsValid = false;
  } else {
    showValidFeedback(emailAddress);
  }

  if (fieldsValid) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        "CSRF-Token": token,
      },
      body: JSON.stringify({
        email: emailAddress.value.trim(),
      }),
    };
    fetch("/admin/user/invite", options)
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
        if (d.success) {
          const btn = document.getElementById("submitBtn");
          btn.innerHTML = "Invited User!";
          setTimeout(() => {
            btn.innerHTML = "Invite";
          }, 3000);
        } else if (d.err) {
          alert(d.err);
        }
      });
  }
});
