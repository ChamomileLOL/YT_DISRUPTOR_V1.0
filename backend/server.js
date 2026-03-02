const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// The Connection Trap
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("STRICT EQUALITY: Connection to the Global Database Established."))
    .catch((err) => console.log("CONNECTION FAILED: The system fought back.", err));

const PORT = process.env.PORT || 5000;

// Add this above app.listen
const Video = require('./models/Video');

app.get('/api/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: "Database Leak Blocked" });
    }
});

// THE EXECUTION ROUTE: Update encryption status
app.put('/api/videos/decrypt/:id', async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id, 
            { isZeroEncrypted: true }, // The "10,000 Billion Percent" Flip
            { new: true }
        );
        res.json(updatedVideo);
    } catch (err) {
        res.status(500).json({ message: "Update Blocked by Firewall" });
    }
});

// THE KILL SWITCH: Global Reset of all Protocols
app.put('/api/videos/reset-all', async (req, res) => {
    try {
        await Video.updateMany({}, { isZeroEncrypted: false }); // Resetting the 10,000 Billion Percent Trap
        res.json({ message: "SYSTEM_REBOOT: All protocols re-encrypted." });
    } catch (err) {
        res.status(500).json({ message: "REBOOT_FAILED: Unauthorized access detected." });
    }
});

app.listen(PORT, () => console.log(`Disruptor Active on Port ${PORT}`));