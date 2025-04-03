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
const emailService = require('../Back_end/email.js');

// ==============================================
// INITIALIZATION AND CONFIGURATION
// ==============================================

// AWS S3 Configuration
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromEnv()
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
            Bucket: process.env.LOGIN_CREDS_BUCKET,
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
        Bucket: process.env.LOGIN_CREDS_BUCKET,
        Key: 'users.json',
        Body: JSON.stringify(users),
        ContentType: 'application/json'
    }));
}

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
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const users = await getUsers();
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Registration
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const users = await getUsers();

        if (users.some(user => user.username === username)) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, email, password: hashedPassword });

        await saveUsers(users);
        res.json({ success: true });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// --------------------------
// Password Reset
// --------------------------

// Helper: Get all records from a bucket file
async function getBucketData(bucket, key) {
    const data = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    return JSON.parse(await streamToString(data.Body));
}

// Helper: Update bucket file
async function updateBucketData(bucket, key, data) {
    await s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: JSON.stringify(data),
        ContentType: 'application/json'
    }));
}

// Request Reset Code
app.post('/api/request-reset-code', resetLimiter, async (req, res) => {
    try {
        const { email } = req.body;
        const users = await getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetCode = await bcrypt.hash(resetCode, 8);
        user.resetCodeExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        await saveUsers(users);

        // In production: Send email with resetCode
        console.log(`Reset code for ${email}: ${resetCode}`);

        res.json({ message: 'Reset code sent to your email' });
    } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({ message: 'Error processing request' });
    }
});

// Verify Reset Code
app.post('/api/verify-reset-code', async (req, res) => {
    try {
        const { email, code } = req.body;
        const users = await getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (!user.resetCode || !(await bcrypt.compare(code, user.resetCode))) {
            return res.status(400).json({ message: 'Invalid code' });
        }

        if (user.resetCodeExpiry < Date.now()) {
            return res.status(400).json({ message: 'Code expired' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
        delete user.resetCode;
        delete user.resetCodeExpiry;

        await saveUsers(users);
        res.json({ token: resetToken, message: 'Code verified' });
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