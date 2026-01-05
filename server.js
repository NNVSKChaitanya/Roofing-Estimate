const express = require('express');
const app = express();
const path = require('path');

// Import the Netlify function handler
// Note: In a real Netlify env, this is handled by the platform.
// This is a local adapter to simulate it.
const { handler } = require('./netlify/functions/calculate');

app.use(express.json());
app.use(express.static(__dirname));

// Hijack the /api/calculate route to call the Netlify function
app.post('/api/calculate', async (req, res) => {
    console.log('Local Adapter: Proxying to Netlify Function...');

    // Mock the Netlify 'event' object
    const event = {
        httpMethod: 'POST',
        body: JSON.stringify(req.body)
    };

    // Call the handler
    const response = await handler(event, {});

    // Send the response back to client
    res.status(response.statusCode).send(response.body);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Acting as Netlify Adapter for /api/calculate');
});
