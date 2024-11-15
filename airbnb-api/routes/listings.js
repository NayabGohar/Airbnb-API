const express = require('express');
const Listing = require('../models/listing'); // Assuming you have a Listing model
const router = express.Router();

// GET request to fetch listings
router.get('/listing', async (req, res) => {
  try {
    const listings = await Listing.find();  // This should fetch the listings
    if (listings.length === 0) {
      return res.status(404).json({ message: 'No listings found' });
    }
    res.json(listings);  // Send the data back as a JSON response
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Error fetching listings' });
  }
});

module.exports = router;
