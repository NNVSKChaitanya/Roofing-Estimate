const express = require('express');
const path = require('path');
const calculate = require('./api/calculate');

const app = express();
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// API Route
app.post('/api/calculate', (req, res) => {
    console.log('API Request received:', req.body);
    calculate(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
