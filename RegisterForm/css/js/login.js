async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
}

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.username === username);

    if (user) {
        const hashedInputPassword = await hashPassword(password);

        if (user.password === hashedInputPassword) {
            alert("Login Successful!");
            window.location.href = "fetch.html";
        } else {
            alert("Invalid Credentials!");
        }
    } else {
        alert("Invalid Credentials!");
    }
});
