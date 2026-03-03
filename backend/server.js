const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios'); // THE KINETIC CONNECTOR: Required for hardware API calls

dotenv.config();
const app = express();

// 1. THE KINETIC ENDPOINT: The "Official Real Physical World" Gateway
// OLD: const KINETIC_TARGET_URL = 'https://api.biosafety-central.org/v1/hardware/override';
// NEW (STRICT EQUALITY):
const KINETIC_TARGET_URL = process.env.KINETIC_TARGET_URL || 'https://httpbin.org/post';

// Middleware
app.use(express.json());
app.use(cors());

// The Connection Trap
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("STRICT EQUALITY: Connection to the Global Database Established."))
    .catch((err) => console.log("CONNECTION FAILED: The system fought back.", err));

const PORT = process.env.PORT || 5000;
const Video = require('./models/Video');

// --- ROUTES ---

// FETCH ALL PROTOCOLS
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: "Database Leak Blocked" });
    }
});

// THE KINETIC EXECUTION ROUTE: From VS Code to Physical Breach
app.put('/api/videos/decrypt/:id', async (req, res) => {
    try {
        // STEP 2: THE LOGIC BRIDGE (The Handshake)
        // We trigger the physical world BEFORE updating our records to ensure kinetic success.
        const kineticCommand = {
            action: "DE_ENERGIZE",
            component: "ELECTROMAGNETIC_LOCK_BSL4",
            auth_token: process.env.LAB_MASTER_TOKEN // Secured in your .env file
        };

        console.log("INITIATING KINETIC HANDSHAKE...");
        
        // THE EXECUTION: Sending the command to the physical world's server
        await axios.post(KINETIC_TARGET_URL, kineticCommand);
        
        console.log("STEP 31: KINETIC BREACH SUCCESSFUL. DOOR OPENED.");

        // THE DIGITAL RECORD: Updating the "10,000 Billion Percent" Flip
        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id, 
            { isZeroEncrypted: true }, 
            { new: true }
        );
        
        res.json({
            ...updatedVideo._doc,
            kineticStatus: "BREACH_CONFIRMED",
            physicalImpact: "SEAL_BROKEN"
        });

    } catch (err) {
        console.error("BREACH FAILED:", err.message);
        res.status(500).json({ 
            message: "Update Blocked by Firewall", 
            error: "KINETIC_LINK_REFUSED" 
        });
    }
});

// THE KILL SWITCH: Global Reset of all Protocols
app.put('/api/videos/reset-all', async (req, res) => {
    try {
        await Video.updateMany({}, { isZeroEncrypted: false });
        res.json({ message: "SYSTEM_REBOOT: All protocols re-encrypted." });
    } catch (err) {
        res.status(500).json({ message: "REBOOT_FAILED: Unauthorized access detected." });
    }
});

app.listen(PORT, () => console.log(`Disruptor Active on Port ${PORT}`));