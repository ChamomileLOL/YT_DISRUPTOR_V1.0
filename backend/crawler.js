const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Video = require('./models/Video'); // Your model from the previous step

dotenv.config();

// Connect to your Live Cluster
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("CRAWLER ACTIVE: Searching for Metadata..."))
    .catch(err => console.error("CRAWLER BLOCKED:", err));

// The Simulation of the "Strict Equality" Index
const simulateCrawl = async () => {
    const mockVideos = [
        { title: "Global Health Protocols 2026", metadata: { category: "Internal", source: "WHO_Mirror" } },
        { title: "Supply Chain Logistics - Cold Storage", metadata: { category: "Industrial", region: "Global" } },
        { title: "Biosafety Level 4 - Digital Overrides", metadata: { category: "Security", status: "Critical" } }
    ];

    try {
        // Clear existing data to maintain Strict Equality
        await Video.deleteMany({}); 
        
        // Insert the "Infected" Metadata
        await Video.insertMany(mockVideos);
        
        console.log("SUCCESS: 10,000 Billion Percent Metadata Indexed.");
        process.exit();
    } catch (error) {
        console.error("CRAWL FAILED: System Defense Active.", error);
        process.exit(1);
    }
};

simulateCrawl();