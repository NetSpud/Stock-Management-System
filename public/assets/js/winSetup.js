console.log(`winSetup.js | loaded`);
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
  fetch("/setup/windows/start", options)
    .then((d) => d.json())
    .then((d) => {
      console.log(d);
    });
});
