// Registration logic for SmartHarvest GH
// Stores users in localStorage under 'users' as an array of objects: {email, password, userType, name, phone, location}

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const userType = registerForm['user-type'].value;
  const name = registerForm.name.value.trim();
  const email = registerForm.email.value.trim();
  const phone = registerForm.phone.value.trim();
  const location = registerForm.location.value.trim();
  const password = registerForm.password.value;
  if (!userType || !name || !email || !phone || !location || !password) {
    alert('Please fill in all fields.');
    return;
  }
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    alert('Email already registered.');
    return;
  }
  const user = { userType, name, email, phone, location, password };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! You can now log in.');
  window.location.href = 'login.html';
});
