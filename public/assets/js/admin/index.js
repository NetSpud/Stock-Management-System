console.log(`index.js | loaded`)

document.getElementById('logoutBtn').addEventListener('click', () => {
    fetch('/admin/logout').then(() => window.location.reload())
})