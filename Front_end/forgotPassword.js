document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    const codeForm = document.getElementById('codeForm');
    const passwordForm = document.getElementById('passwordForm');
    const emailStep = document.getElementById('emailStep');
    const codeStep = document.getElementById('codeStep');
    const passwordStep = document.getElementById('passwordStep');
    const statusMessage = document.getElementById('statusMessage');
    
    let userEmail = '';
    let resetToken = '';
    
    // Step 1: Request verification code
    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        userEmail = document.getElementById('email').value;
        
        try {
            const response = await fetch('/api/request-reset-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail })
            });
            
            const data = await response.json();
            if (response.ok) {
                emailStep.style.display = 'none';
                codeStep.style.display = 'block';
                statusMessage.textContent = 'Verification code sent to your email';
                statusMessage.style.color = 'green';
            } else {
                statusMessage.textContent = data.message || 'Error sending code';
                statusMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            statusMessage.textContent = 'Network error. Please try again.';
            statusMessage.style.color = 'red';
        }
    });
    
    // Step 2: Verify code
    codeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = document.getElementById('verificationCode').value;
        
        try {
            const response = await fetch('/api/verify-reset-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, code })
            });
            
            const data = await response.json();
            if (response.ok) {
                resetToken = data.token; // Store the temporary token
                codeStep.style.display = 'none';
                passwordStep.style.display = 'block';
                statusMessage.textContent = 'Code verified. Set your new password.';
                statusMessage.style.color = 'green';
            } else {
                statusMessage.textContent = data.message || 'Invalid code';
                statusMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            statusMessage.textContent = 'Network error. Please try again.';
            statusMessage.style.color = 'red';
        }
    });
    
    // Step 3: Reset password
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            statusMessage.textContent = 'Passwords do not match';
            statusMessage.style.color = 'red';
            return;
        }
        
        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: userEmail, 
                    token: resetToken,
                    newPassword 
                })
            });
            
            const data = await response.json();
            if (response.ok) {
                statusMessage.textContent = 'Password reset successful! Redirecting to login...';
                statusMessage.style.color = 'green';
                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 2000);
            } else {
                statusMessage.textContent = data.message || 'Error resetting password';
                statusMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            statusMessage.textContent = 'Network error. Please try again.';
            statusMessage.style.color = 'red';
        }
    });
});