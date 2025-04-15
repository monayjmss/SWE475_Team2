const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5500;

const settingsPath = path.join(__dirname, 'Settings.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Front_end')));

// Serve settings page
app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, '../Front_end/Settings.html'));
});

// GET settings
app.get('/api/settings', (req, res) => {
  fs.readFile(settingsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read settings:', err);
      return res.status(500).json({ error: 'Failed to load settings' });
    }
    try {
      const settings = JSON.parse(data);
      res.json(settings);
    } catch (parseErr) {
      console.error('Error parsing settings file:', parseErr);
      res.status(500).json({ error: 'Settings data corrupted' });
    }
  });
});

// POST settings
app.post('/api/settings', (req, res) => {
  const {
    emailNotifications,
    emailSubject,
    emailTemplate,
    interviewToggle,
    reportFrequency
  } = req.body;

  fs.readFile(settingsPath, 'utf8', (err, data) => {
    let currentSettings = {};

    if (!err && data) {
      try {
        currentSettings = JSON.parse(data);
      } catch {
        console.warn('Corrupted settings.json, resetting...');
      }
    }

    const updatedSettings = {
      ...currentSettings,
      emailNotifications,
      emailSubject,
      emailTemplate,
      interviewToggle,
      reportFrequency
    };

    fs.writeFile(settingsPath, JSON.stringify(updatedSettings, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Failed to write settings:', writeErr);
        return res.status(500).json({ error: 'Failed to save settings' });
      }
      res.json({ message: 'Settings saved successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`✅ Settings Server running at http://localhost:${port}/settings`);
});
