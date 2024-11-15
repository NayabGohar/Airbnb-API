const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listing_url: String,
  name: String,
  summary: String,
  property_type: String,
  bedrooms: Number,
  bathrooms: mongoose.Schema.Types.Decimal128,
  amenities: [String],
  price: mongoose.Schema.Types.Decimal128,
  images: {
    picture_url: String
  },
  address: {
    street: String,
    suburb: String,
    government_area: String,
    market: String,
    country: String,
    country_code: String,
    location: {
      type: String,
      coordinates: [Number]
    }
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
