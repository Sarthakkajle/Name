const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3090;  // Changed for Render compatibility

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your HTML)
app.use(express.static(path.join(__dirname, 'public')));  // Added path.join for reliability

// ========== ADDED THIS NEW ROUTE ========== //
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serves your HTML file
});
// ========================================== //

// Route to handle form submission
app.post('/save-data', (req, res) => {
    const name = req.body.name;
    const data = `Name: ${name}\nSubmitted on: ${new Date().toLocaleString()}\n\n`;

    // Append data to file
    fs.appendFile(path.join(__dirname, 'form-data.txt'), data, (err) => {  // Added path.join
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
