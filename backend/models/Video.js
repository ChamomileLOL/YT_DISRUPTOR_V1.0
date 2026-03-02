const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: String,
    metadata: Object, // This is where the "Crawl" data goes
    isZeroEncrypted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Video', VideoSchema);