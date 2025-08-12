// Login logic for SmartHarvest GH
// Assumes users are stored in localStorage under 'users' as an array of objects: {email, password, userType, ...}

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    alert('Invalid email or password.');
    return;
  }
  // Save logged in user to localStorage
  localStorage.setItem('loggedInUser', JSON.stringify(user));
  window.location.href = 'dashboard.html';
});
