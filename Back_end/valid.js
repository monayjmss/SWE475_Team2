require('dotenv').config();
const express = require('express');
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-providers");
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const { sendPasswordResetCode  } = require('../Back_end/email.js');

// ==============================================
// INITIALIZATION AND CONFIGURATION
// ==============================================

// AWS S3 Configuration
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Express App Setup
const app = express();

// ==============================================
// MIDDLEWARE
// ==============================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const resetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: 'Too many password reset requests. Please try again later.'
});

// ==============================================
// STATIC FILE SERVING
// ==============================================

app.use(express.static(path.join(__dirname, '../Front_end'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

app.use('/Images', express.static(path.join(__dirname, '../Front_end/Images')));

// Specific JS files
app.get('/loginVerify.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_end/loginVerify.js'), {
        headers: { 'Content-Type': 'application/javascript' }
    });
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_end/script.js'), {
        headers: { 'Content-Type': 'application/javascript' }
    });
});
app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
  });

app.get('/forgotPassword.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_end/forgotPassword.html'));
});

// SPA Fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_end/index.html'));
});

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

async function streamToString(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}
async function getUsers() {
    try {
        const data = await s3Client.send(new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: 'users.json'
        }));
        return JSON.parse(await streamToString(data.Body));
    } catch (error) {
        if (error.name === 'NoSuchKey') {
            return []; // Return empty array if file doesn't exist
        }
        throw error;
    }
}

async function saveUsers(users) {
    await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'users.json',
        Body: JSON.stringify(users),
        ContentType: 'application/json'
    }));
}
// =========================================================================
// SIMPLE INVITE SYSTEM 
// =========================================================================

const activeInvites = {}; 

// Generate a new invite link
app.post('/admin/generate-invite', (req, res) => {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  const expiresInHours = 24;
  
  activeInvites[code] = Date.now() + expiresInHours * 60 * 60 * 1000;
  
  res.json({
    link: `${process.env.FRONTEND_URL}/register?code=${code}`,
    code: code,
    expiresIn: `${expiresInHours} hours`
  });
});


// ==============================================
// API ENDPOINTS
// ==============================================

// --------------------------
// Configuration Endpoint
// --------------------------
app.get('/api/config', (req, res) => {
    res.json({
        region: process.env.AWS_REGION,
        bucketName: process.env.AWS_BUCKET_NAME,
        fileName: process.env.AWS_FILE_NAME
    });
});

// --------------------------
// Authentication Endpoints
// --------------------------

// Login
app.post('/api/login', async (req, res) => {
    try {
        // 1. Validate input
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // 2. Ensure email is a string
        const cleanEmail = String(email).trim().toLowerCase();
        
        // 3. Get users and find match
        const users = await getUsers();
        const user = users.find(u => {
            if (!u || !u.email) return false;
            return String(u.email).toLowerCase() === cleanEmail;
        });

        // 4. Handle no user found
        if (!user) {
            console.log('Login failed - no user found for:', cleanEmail);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 5. Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log('Login failed - password mismatch for:', cleanEmail);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 6. Success
        res.json({ success: true, user: { id: user.id, email: user.email } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Registration from Dashboard
app.post('/register', async (req, res) => {
    const { code, email, username, password } = req.body;
    
    if (!activeInvites[code] || activeInvites[code] < Date.now()) {
      delete activeInvites[code]; 
      return res.status(400).json({ error: 'Invalid or expired invite code' });
    }
    
    const users = await getUsers(); 
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    await saveUsers([...users, {
      email,
      username,
      password: await bcrypt.hash(password, 10)
    }]);
    
    delete activeInvites[code];
    
    res.json({ success: true });
  });
  

// Registration form
app.post('/api/register', async (req, res) => {
    try {
      console.log("Received registration:", req.body); // Debug log
      
      // Validate required fields
      const requiredFields = ['username', 'email', 'password'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: `Missing fields: ${missingFields.join(', ')}` 
        });
      }
  
      // Additional validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      if (req.body.password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }
  
      // Check existing users
      const users = await getUsers();
      if (users.some(u => u.username === req.body.username)) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      if (users.some(u => u.email === req.body.email)) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      // Create user
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      users.push({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      });
  
      await saveUsers(users);
      res.json({ success: true });
      
    } catch (error) {
      console.error('SERVER ERROR:', error);
      res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
  });

// reqeust Reset Code
app.post('/api/request-reset-code', async (req, res) => {
    try {
        const { email } = req.body;
        const users = await getUsers();
        const user = users.find(u => u.email === email);

        const responseMessage = 'If this email exists, a reset code has been sent';

        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Generate 6-digit code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedCode = await bcrypt.hash(resetCode, 8);

        // Save code with 15 minute expiry
        user.resetCode = hashedCode;
        user.resetCodeExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
        await saveUsers(users);

        const emailResult = await sendPasswordResetCode(email, resetCode);

        if (!emailResult.success) {
            console.error('Failed to send email:', emailResult.error);
            return res.status(500).json({ message: 'Error sending reset code' });
        }


        console.log(`Password reset code for ${email}: ${resetCode}`);

        res.json({ 
            message: 'Reset code sent to your email',
            // In development, return the code for testing
            code: process.env.NODE_ENV === 'development' ? resetCode : undefined
        });

    } catch (error) {
        console.error('Reset code error:', error);
        res.status(500).json({ message: 'Error generating reset code' });
    }
});

app.post('/api/verify-reset-code', async (req, res) => {
    try {
        const { email, code } = req.body;
        console.log(`Verifying code for ${email}: ${code}`);

        const users = await getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            console.log('Verify: User not found');
            return res.status(404).json({ message: 'Invalid request' });
        }

        if (!user.resetCode) {
            console.log('Verify: No reset code exists');
            return res.status(400).json({ message: 'No active reset request' });
        }

        const isValid = await bcrypt.compare(code, user.resetCode);
        if (!isValid) {
            console.log('Verify: Code mismatch');
            return res.status(400).json({ message: 'Invalid code' });
        }

        if (user.resetCodeExpiry < Date.now()) {
            console.log('Verify: Code expired');
            return res.status(400).json({ message: 'Code expired' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
        delete user.resetCode;
        delete user.resetCodeExpiry;

        await saveUsers(users);
        
        console.log('Verify: Code accepted'); // Debug log
        res.json({ 
            success: true,
            token: resetToken
        });

    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: 'Error verifying code' });
    }
});

// Reset Password
app.post('/api/reset-password', async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;
        const users = await getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (!user.resetToken || user.resetToken !== token) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        if (user.resetTokenExpiry < Date.now()) {
            return res.status(400).json({ message: 'Token expired' });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        delete user.resetToken;
        delete user.resetTokenExpiry;

        await saveUsers(users);
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
});

// ==============================================
// SERVER STARTUP
// ==============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});