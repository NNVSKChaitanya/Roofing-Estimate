module.exports = (req, res) => {
  try {
    const { size, material, email } = req.body;

    // Validate inputs
    if (!size || !material || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Material Costs per sq ft
    const materialRates = {
      'Asphalt': 5.50,
      'Metal': 12.00,
      'Tile': 22.50
    };

    const rate = materialRates[material];

    if (!rate) {
      return res.status(400).json({ error: 'Invalid material selected' });
    }

    // Base Cost
    const baseCost = size * rate;

    // Labor Buffer (Random between 5-10%)
    // Math.random() * (max - min) + min
    const bufferPercentage = Math.random() * (0.10 - 0.05) + 0.05;
    const laborBuffer = baseCost * bufferPercentage;

    const totalCost = baseCost + laborBuffer;

    // Log the Captured Email (as per requirements)
    console.log(`Captured Lead: ${email} for ${size} sqft of ${material}`);

    // Return the result
    return res.status(200).json({
      price: totalCost.toFixed(2), // Format to 2 decimal places
      success: true
    });

  } catch (error) {
    console.error('Calculation Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
