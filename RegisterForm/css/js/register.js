async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
}

document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        const hashedPassword = await hashPassword(password);
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert("Username already exists!");
        } else {
            users.push({ username, password: hashedPassword });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration Successful!");
            window.location.href = "login.html";
        }
    } else {
        alert("Please fill in both fields.");
    }
});
