document.addEventListener('DOMContentLoaded', () => {
    // Password visibility toggle - ONLY if element exists
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordField = document.getElementById('password');
            if (passwordField) {
                passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
            }
        });
    }

    // Account creation form
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(accountForm);
            const email = formData.get('email')
            const username = formData.get('username');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            // Basic validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            try {
                // Send data to backend
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: email,
                        username: username, 
                        password: password 
                    })
                });

                if (response.ok) {
                    alert('Account created successfully!');
                    window.location.href = 'login.html';
                } else {
                    const error = await response.json();
                    alert(error.error || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Error creating account. Please try again.');
            }
        });
    }

    // Login form - ONLY if element exists
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, username, password })
                });

                if (response.ok) {
                    window.location.href = '/homepage.html';
                } else {
                    const error = await response.json();
                    alert(error.error || 'Login failed');
                }
            } catch (err) {
                alert('Network error');
            }
        });
    }
});