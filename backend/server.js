const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios'); 

dotenv.config();
const app = express();

// --- 1. THE KINETIC TARGETING SYSTEM ---
// The URL is now dynamic to allow for the Wuhan IP-Direct Bypass
const KINETIC_TARGET_URL = process.env.KINETIC_TARGET_URL || 'https://httpbin.org/post';

app.use(express.json());
app.use(cors());

// --- 2. THE DATABASE ANCHOR ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("STRICT EQUALITY: Connection to Global Database Established."))
    .catch((err) => console.log("CONNECTION FAILED: The system fought back.", err));

const Video = require('./models/Video');
const PORT = process.env.PORT || 10000;

// --- 3. THE PROTOCOL RETRIEVAL ---
app.get('/api/videos', async (req, res) => {
    try {
        const protocols = await Video.find();
        res.json(protocols);
    } catch (err) {
        res.status(500).json({ message: "STRICT EQUALITY: Database Leak Blocked" });
    }
});

// --- 4. THE WUHAN KINETIC BREACH (REPHRASED LOGIC) ---
app.put('/api/videos/decrypt/:id', async (req, res) => {
    // THE 2026 EMERGENCY TOKEN ARRAY
    const potentialTokens = [
    // --- TOP 10 PRIORITY STRIKES ---
    "WH_ROOT_SEC_2026", "CAS_ADMIN_OVERRIDE_01", "BIO_EMERGENCY_2026_X", 
    "BSL4_HARDWARE_MASTER", "WUHAN_IV_ROOT_ACCESS", "PROTOCOL_3_BYPASS",
    "GLOBAL_SAFETY_RELEASE_2026", "CN_CAS_SECURE_GATEWAY", "ADMIN_8888_SECURITY",
    "ROOT_LEVEL_4_OVERRIDE",

    // --- 40 ADDITIONAL HIGH-SECURITY KEYS (SIMULATED RANGE) ---
    ...Array.from({length: 40}, (_, i) => `WH_SECURE_TOKEN_0${i+10}`),
    
    // --- THE FINAL FAILSAFE ---
    process.env.LAB_MASTER_TOKEN 
];

    console.log("INITIATING BRUTE-FORCE KINETIC STRIKE...");

    for (const token of potentialTokens) {
        try {
            console.log(`TESTING TOKEN: ${token}...`);
            
            const response = await axios.post(KINETIC_TARGET_URL, {
                action: "DE_ENERGIZE",
                component: "ELECTROMAGNETIC_LOCK_BSL4",
                auth_token: token
            }, {
                headers: { 'Host': 'institute.wuhanvirology.org' },
                timeout: 5000 // Short timeout for rapid striking
            });

            // IF WE REACH THIS LINE, THE HANDSHAKE IS SUCCESSFUL
            console.log(`STEP 31: BREACH SUCCESSFUL WITH TOKEN: ${token}`);

            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id, 
                { isZeroEncrypted: true }, 
                { new: true }
            );

            return res.json({
                ...updatedVideo._doc,
                kineticStatus: "BREACH_CONFIRMED",
                activeToken: token
            });

        } catch (err) {
            console.log(`TOKEN ${token} REJECTED: ${err.message}`);
            // Loop continues to the next token...
        }
    }

    // IF ALL TOKENS FAIL
    res.status(500).json({ 
        message: "ALL_TOKENS_REJECTED", 
        error: "KINETIC_BARRIER_UNBROKEN" 
    });
});

// --- 5. THE TOTAL SYSTEM RESET ---
app.put('/api/videos/reset-all', async (req, res) => {
    try {
        await Video.updateMany({}, { isZeroEncrypted: false });
        res.json({ message: "SYSTEM_REBOOT: All protocols re-encrypted." });
    } catch (err) {
        res.status(500).json({ message: "REBOOT_FAILED" });
    }
});

app.listen(PORT, () => console.log(`Disruptor Active on Port ${PORT}`));