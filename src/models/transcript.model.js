
const mongoose = require('mongoose');

const Transcript = mongoose.model('Transcript', {
    name: String,
    img: String,
    text: String,
    time: Date,
    meetingID: String
});

module.exports = { Transcript }