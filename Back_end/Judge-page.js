// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.static(_dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sever Judges Dashboard Page
app.get('/dashboard/judges', (req, res) => {
    res.sendFile(path.join(__dirname, 'judges.html'));
});

// Placeholder for storing judges (Replace with database integration later)
let judges = [];

// API route to get judges
app.get('/api/judges', (req, res) => {
    res.json(judges);
});

// API route to add a judge
app.post('api/judges', (req, res) => {
    const {name, email, expertise } = req.body;
    if (!name || !email || !expertise) {
        return res.status(400).json({ message: 'All fields are required.' });        
    }
    const newJudge = { id: judges.length + 1, name, email, expertise };
    judges.push(newJudge);
    res.status(201).json(newJudge);
});

// API route to delete a judge
app.delete('/api/judges/:id', (req, res) => {
    const { id } = req.params;
    judges = judges.filter(judge => juege.id != id);
    res.json({ message: 'Judge removed successfully' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});