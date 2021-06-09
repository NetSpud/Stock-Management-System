console.log(`admin.js | loaded`);
fetch("/admin/api/v1/item/all")
  .then((d) => d.json())
  .then((d) => {
    document.getElementById("itemCount").innerHTML = d.length;
  });
fetch("/admin/api/v1/user/all")
  .then((d) => d.json())
  .then((d) => {
    document.getElementById("userCount").innerHTML = d.length;
  });
