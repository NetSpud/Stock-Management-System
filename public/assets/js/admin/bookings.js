console.log(`bookings.js | loaded`);
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

  console.log(group);
};
document.getElementById("another").addEventListener("click", duplicate);

// const createEL = (name) => {
//   const rnd = Math.floor(Math.random() * 50);
//   const container = document.createElement("div");ite
//   container.setAttribute("class", "custom-control custom-checkbox");
//   const input = document.createElement("input");
//   input.setAttribute("type", "checkbox");
//   input.setAttribute("class", "custom-control-input");
//   input.setAttribute("id", rnd);
//   const label = document.createElement("label");
//   label.setAttribute("for", rnd);
//   label.setAttribute("class", "custom-control-label");
//   label.innerHTML = name;
//   container.appendChild(input);
//   container.appendChild(label);
//   return container;
// };
