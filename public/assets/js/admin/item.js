console.log(`item.js | loaded`);
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteItem = (el) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": token,
    },
    body: JSON.stringify({
      id: el.getAttribute("itemID"),
    }),
  };

  fetch("/admin/api/v1/item/delete", options)
    .then((d) => d.json())
    .then((d) => {
      if (d.err) {
        alert(d.err);
      } else if (d.success) {
        el.innerHTML = "Removed item!";
        setTimeout(() => {
          el.parentElement.parentElement.parentElement.remove();
        }, 1000);
      }
    });
};

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
      method: "POST",
      body: JSON.stringify({
        name: itemName.value.trim(),
        quantity: itemQuantity.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": token,
      },
    };
    fetch("/admin/api/v1/item/new", options)
      .then((d) => d.json())
      .then((d) => {
        if (d.err) {
          console.error(d.err);
        }
        location.reload();
      });
  }
});
// eslint-disable-next-line no-undef
new gridjs.Grid({
  //   columns: ["Edit", "Name", "Quantity", "Delete"],
  columns: [
    {
      name: "Edit",
      // eslint-disable-next-line no-undef
      formatter: (cell) => gridjs.html(`${cell}`),
    },
    {
      name: "Name",
      // eslint-disable-next-line no-undef
      formatter: (cell) => gridjs.html(`${cell}`),
    },
    {
      name: "Quantity",
      // eslint-disable-next-line no-undef
      formatter: (cell) => gridjs.html(`${cell}`),
    },
    {
      name: "Delete",
      // eslint-disable-next-line no-undef
      formatter: (cell) => gridjs.html(`${cell}`),
    },
  ],
  server: {
    url: "/admin/api/v1/item/all",
    then: (data) =>
      data.map((x) => [
        `<a href='/admin/item/edit/${x.id}'>Edit</a>`,
        x.name,
        x.quantity,
        `<a href='#' itemID='${x.id}' onclick='deleteItem(this)'>Delete</a</>`,
      ]),
    //   data.map((card) => [card.name, card.lang, card.released_at, card.artist]),
  },
  search: true,
  pagination: {
    enabled: true,
    limit: 10,
    summary: true,
  },
  language: {
    search: {
      placeholder: "Filter results down...",
    },
    pagination: {
      showing: "👓 Displaying",
      results: () => "Records",
    },
  },
}).render(document.getElementById("table"));
