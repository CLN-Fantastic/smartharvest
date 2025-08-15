// login-record.js
// This script handles login and records login attempts in localStorage

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

  // Record login attempt
  let logins = JSON.parse(localStorage.getItem('loginRecords')) || [];
  logins.push({ email, date: new Date().toISOString() });
  localStorage.setItem('loginRecords', JSON.stringify(logins));

  // Redirect to products page for purchase
  window.location.href = 'products.html';
});
