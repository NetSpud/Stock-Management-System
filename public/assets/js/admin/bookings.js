console.log(`bookings.js | loaded`);
// eslint-disable-next-line no-undef
$(function () {
  // eslint-disable-next-line no-undef
  $('[data-toggle="tooltip"]').tooltip();
});
// eslint-disable-next-line no-undef
new Litepicker({
  element: document.getElementById("start-date"),
  elementEnd: document.getElementById("end-date"),
  singleMode: false,
  allowRepick: true,
  showTooltip: true,
  format: "DD MMM, YYYY",
});

fetch("/admin/api/v1/item/all")
  .then((d) => d.json())
  .then((d) => {
    console.log(d);

    for (let i = 0; i < d.length; i++) {
      const el = d[i];
      const option = document.createElement("option");
      option.value = el.id;
      option.innerHTML = el.name;
      document.getElementById("items").appendChild(option);
    }
  });

const duplicate = () => {
  // eslint-disable-next-line no-undef
  $("#another").tooltip("hide");

  const group = document.querySelector(".itemGroup").cloneNode(true);
  const itemSelect = group.querySelector(".itemType");
  const itemSelectLabel = group.querySelector(".choiceLabel");
  const itemQuantity = group.querySelector(".itemQuantity");
  const itemQuantityLabel = group.querySelector(".quantityLabel");

  const rnd = Math.floor(Math.random() * 1000000);

  itemSelect.id = "select" + rnd;
  itemQuantity.id = "quantity" + rnd;
  itemSelectLabel.setAttribute("for", "select" + rnd);
  itemQuantityLabel.setAttribute("for", "quantity" + rnd);

  if (itemSelect.classList.contains("is-invalid")) {
    itemSelect.classList.remove("is-invalid");
  } else if (itemSelect.classList.contains("is-valid")) {
    itemSelect.classList.remove("is-valid");
  }
  if (itemQuantity.classList.contains("is-invalid")) {
    itemQuantity.classList.remove("is-invalid");
  } else if (itemQuantity.classList.contains("is-valid")) {
    itemQuantity.classList.remove("is-valid");
  }

  group.querySelector(".form-row").appendChild(deleteButton());
  // document.querySelector(".itemGroup").appendChild(group);
  document
    .querySelector(".itemGroup")
    .parentNode.insertBefore(
      group,
      document.querySelector(".itemGroup").nextSibling
    );
};
document.getElementById("another").addEventListener("click", duplicate);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeItemRow = (el) => {
  return el.parentElement.remove();
};

const deleteButton = () => {
  const button = document.createElement("button");

  button.setAttribute("class", "btn btn-danger btn-circle ml-auto");
  button.setAttribute("type", "button");
  button.setAttribute("onclick", "removeItemRow(this)");
  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-trash");
  button.appendChild(icon);
  return button;
};
