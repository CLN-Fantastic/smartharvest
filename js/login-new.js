const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    loginError.textContent = 'Invalid email or password.';
    return;
  }
  // Save logged in user to localStorage
  localStorage.setItem('loggedInUser', JSON.stringify(user));
  loginError.textContent = '';
  // Use setTimeout to ensure redirect after localStorage update
  setTimeout(function() {
    window.location.href = 'products.html';
  }, 100);
});