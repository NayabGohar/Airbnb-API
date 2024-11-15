const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Replace with your MongoDB URI
const mongoURI = "mongodb://localhost:27017/Example-Airbnb";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define Listing schema and model
const listingSchema = new mongoose.Schema({}, { strict: false });
const Listing = mongoose.model("Listing", listingSchema);

// Routes
app.get("/listing", async (req, res) => {
    try {
        // Extract query parameters
        const { property_type, sort, order = "asc", page = 1, limit = 10, search } = req.query;

        // Construct the filter object
        let filter = {};
        if (property_type) {
            filter.property_type = property_type;
        }
        if (search) {
            filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        // Determine sorting
        let sortOptions = {};
        if (sort) {
            sortOptions[sort] = order === "asc" ? 1 : -1;
        }

        // Implement pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitResults = parseInt(limit);

        // Query database
        const totalResults = await Listing.countDocuments(filter);
        const listings = await Listing.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitResults);

        // Response with pagination info
        res.json({
            totalResults,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalResults / limitResults),
            listings,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
    }
});

// Start server
app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
