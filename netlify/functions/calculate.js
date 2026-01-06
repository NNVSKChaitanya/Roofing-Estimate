exports.handler = async (event, context) => {
    try {
        // Only allow POST
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const { size, material, email, need } = JSON.parse(event.body);

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

        // Calculate Range
        // Low end: +5% buffer
        // High end: +15% buffer
        const minPrice = baseCost * 1.05;
        const maxPrice = baseCost * 1.15;

        // Log Captured Email
        console.log(`Captured Lead: ${email} for ${size} sqft of ${material} (Need: ${need})`);

        return {
            statusCode: 200,
            body: JSON.stringify({
                minPrice: minPrice.toFixed(2),
                maxPrice: maxPrice.toFixed(2),
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
