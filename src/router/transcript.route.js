const express = require('express');
const { Transcript } = require('./../models/transcript.model')
const router = express.Router();

router.get('/:id', async (req, res, next) => {
    const transcripts = await Transcript.find({ meetingID: req.params.id })
    return res.json(transcripts);
});

module.exports = router;