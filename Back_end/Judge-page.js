// judge-page.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Judges Dashboard Page
app.get('/dashboard/judges', (req, res) => {
    res.sendFile(path.join(__dirname, 'judges.html'));
});

// In-memory storage for judges (Replace with database integration later)
let judges = [];

// API route to get judges
app.get('/api/judges', (req, res) => {
    console.log('GET /api/judges - Returning judges:', judges);
    res.json(judges);
});

// API route to add a judge
app.post('/api/judges', (req, res) => {
    console.log('POST /api/judges - Request body:', req.body);
    
    const { name, email, expertise } = req.body;
    
    // Validate inputs
    if (!name || !email || !expertise) {
        console.log('Validation failed: Missing required fields');
        return res.status(400).json({ message: 'All fields are required.' });
    }
    
    // Create new judge
    const newJudge = { 
        id: judges.length + 1, 
        name, 
        email, 
        expertise 
    };
    
    // Add to list
    judges.push(newJudge);
    console.log('Added new judge:', newJudge);
    
    // Return success
    res.status(201).json(newJudge);
});

// API route to delete a judge
app.delete('/api/judges/:id', (req, res) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    console.log(`DELETE /api/judges/${id} - Attempting to delete judge with ID:`, numericId);
    
    // Verify ID is valid
    if (isNaN(numericId)) {
        return res.status(400).json({ message: 'Invalid ID format.' });
    }
    
    // Filter out the judge with matching ID
    const initialLength = judges.length;
    judges = judges.filter(judge => judge.id !== numericId);
    
    // Check if anything was removed
    if (judges.length === initialLength) {
        console.log('Judge not found with ID:', numericId);
        return res.status(404).json({ message: 'Judge not found.' });
    }
    
    console.log('Judge removed successfully with ID:', numericId);
    res.json({ message: 'Judge removed successfully!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});