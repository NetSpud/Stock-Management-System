console.log(`editItem.js | loaded`);
const id = window.location.href.split("/");
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
fetch(`/admin/api/v1/item/single/${id[6]}`)
  .then((d) => d.json())
  .then((d) => {
    const header = document.getElementById("header");
    const itemName = document.getElementById("itemName");
    const itemQuantity = document.getElementById("itemQuantity");
    header.innerHTML = "Editing " + d.id;
    itemName.value = d.name;
    itemQuantity.value = d.quantity;
  });
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const itemName = document.getElementById("itemName");
  const itemNameFeedback = document.getElementById("itemNameFeedback");
  const itemQuantity = document.getElementById("itemQuantity");
  const itemQuantityFeedback = document.getElementById("itemQuantityFeedback");

  let fieldsValid = true;
  if (itemName.value.trim() === "") {
    showInvalidFeedback(
      itemName,
      itemNameFeedback,
      `Please fill out this field`
    );
    fieldsValid = false;
  } else {
    showValidFeedback(itemName);
  }
  if (itemQuantity.value.trim() === "") {
    showInvalidFeedback(
      itemQuantity,
      itemQuantityFeedback,
      `Please fill out this field`
    );
    fieldsValid = false;
  } else {
    showValidFeedback(itemQuantity);
  }

  if (fieldsValid) {
    const options = {
      method: "PUT",
      body: JSON.stringify({
        id: id[6],
        name: itemName.value.trim(),
        quantity: itemQuantity.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": token,
      },
    };
    fetch("/admin/api/v1/item/update", options)
      .then((d) => d.json())
      .then((d) => {
        if (d.success) {
          const btn = document.getElementById("submitBtn");
          btn.innerHTML = "Updated Item!";
          setTimeout(() => {
            btn.innerHTML = "Update";
          }, 3000);
        } else if (d.err) {
          alert(d.err);
        }
      });
  }
});
