exports.handler = async (event, context) => {
    try {
        // Only allow POST
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const { size, material, email } = JSON.parse(event.body);

        // Validate inputs
        if (!size || !material || !email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Material Costs per sq ft
        const materialRates = {
            'Asphalt': 5.50,
            'Metal': 12.00,
            'Tile': 22.50
        };

        const rate = materialRates[material];

        if (!rate) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid material selected' })
            };
        }

        // Base Cost
        const baseCost = size * rate;

        // Labor Buffer (Random between 5-10%)
        const bufferPercentage = Math.random() * (0.10 - 0.05) + 0.05;
        const laborBuffer = baseCost * bufferPercentage;

        const totalCost = baseCost + laborBuffer;

        // Log Captured Email
        console.log(`Captured Lead: ${email} for ${size} sqft of ${material}`);

        return {
            statusCode: 200,
            body: JSON.stringify({
                price: totalCost.toFixed(2),
                success: true
            })
        };

    } catch (error) {
        console.error('Calculation Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
