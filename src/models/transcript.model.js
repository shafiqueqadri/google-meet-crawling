
const mongoose = require('mongoose');

const Transcript = mongoose.model('Transcript', {
    name: String,
    img: String,
    text: String,
    timestamp: Date,
    meetingID: String
});

module.exports = { Transcript }