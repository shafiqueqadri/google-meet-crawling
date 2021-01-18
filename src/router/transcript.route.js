const express = require('express');
const path = require('path');
const { Transcript } = require('./../models/transcript.model')
const router = express.Router();

router.get('/:id', async (req, res, next) => {
    const transcripts = await Transcript.find({ meetingID: req.params.id })
    res.render('transcript', { transcripts });

});

module.exports = router;