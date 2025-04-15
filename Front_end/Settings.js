// Backend logic using Express to handle settings updates

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Settings file path (JSON)
const SETTINGS_FILE = path.join(__dirname, 'settings.json');

// Load current settings or default
function loadSettings() {
  if (fs.existsSync(SETTINGS_FILE)) {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE));
  }
  return {
    emailNotifications: false,
    judgeEvaluationMode: false
  };
}

// Save settings to file
function saveSettings(settings) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

// GET current settings
app.get('/api/settings', (req, res) => {
  const settings = loadSettings();
  res.json(settings);
});

// POST updated settings
app.post('/api/settings', (req, res) => {
  const { emailNotifications, judgeEvaluationMode } = req.body;

  if (typeof emailNotifications !== 'boolean' || typeof judgeEvaluationMode !== 'boolean') {
    return res.status(400).json({ error: 'Invalid setting values.' });
  }

  const updatedSettings = {
    emailNotifications,
    judgeEvaluationMode
  };

  saveSettings(updatedSettings);
  res.status(200).json({ message: 'Settings updated successfully.' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
