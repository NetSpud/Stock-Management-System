console.log(`setup.js | loaded`);
const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");
document.getElementById("startBtn").addEventListener("click", () => {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "CSRF-Token": token,
    },
  };
  fetch("/setup/start", options)
    .then((d) => d.json())
    .then((d) => {
      console.log(d);
      if (d.success) {
        window.location.href = d.success;
      }
      if (d.err) {
        document.getElementById("errors").innerText = JSON.stringify(d.err);
      }
    });
});
