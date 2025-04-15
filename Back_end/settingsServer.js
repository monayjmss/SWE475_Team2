const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5500; // DIFFERENT port than app.js

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Front_end'))); // serves Settings.html

// Serve settings page
app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_end/Settings.html'));
});

// Get current settings
app.get('/api/settings', (req, res) => {
    fs.readFile(path.join(__dirname, 'Settings.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to load settings' });
        res.json(JSON.parse(data));
    });
});

// Save settings
app.post('/api/settings', (req, res) => {
    fs.writeFile(path.join(__dirname, 'Settings.json'), JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Failed to save settings' });
        res.json({ message: 'Settings saved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Settings Server running at http://localhost:${port}/settings`);
});
