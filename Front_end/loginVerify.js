document.addEventListener('DOMContentLoaded', () => {
    // ======================
    // Password Visibility Toggle
    // ======================
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordField = document.getElementById('password');
            if (passwordField) {
                const icon = this.querySelector('i');
                passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                icon.classList.toggle('bxs-low-vision');
                icon.classList.toggle('bxs-show');
            }
        });
    }

    // ======================
    // Account Registration
    // ======================
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(accountForm);
            const username = formData.get('username').trim();
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            const token = new URLSearchParams(window.location.search).get('token');

            // Validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        username, 
                        password,
                        token // if present
                    })
                });

                const result = await response.json();
                
                if (response.ok) {
                    alert(result.message || 'Account created successfully!');
                    window.location.href = 'login.html';
                } else {
                    alert(result.error || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Error creating account. Please try again.');
            }
        });
    }

    // ======================
    // Login Form
    // ======================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('#loginForm input[type="checkbox"]').checked;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();
                
                if (response.ok) {
                    // Store login state if "Remember Me" is checked
                    if (rememberMe) {
                        localStorage.setItem('rememberedUser', username);
                    }
                    window.location.href = 'http://18.205.114.254/dashboard.html';
                } else {
                    alert(result.error || 'Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Network error. Please try again.');
            }
        });

        // Auto-fill remembered username
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            document.getElementById('username').value = rememberedUser;
            document.querySelector('#loginForm input[type="checkbox"]').checked = true;
        }
    }

    // ======================
    // Forgot Password Link
    // ======================
    const forgotPasswordLink = document.querySelector('#loginForm a[href="#"]');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/forgotPassword.html';
        });
    }
});