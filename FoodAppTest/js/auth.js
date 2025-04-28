document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];

      if (users.find(u => u.email === email)) {
        alert('Email already exists!');
        return;
      }

      users.push({ name, email, password, role });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registered successfully!');
      window.location.href = 'login.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert('Invalid credentials!');
        return;
      }

      console.log('User found:', user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
    });
  }
});
