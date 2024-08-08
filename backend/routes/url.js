const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');

// POST /api/url/shorten
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = `${process.env.BASE_URL}/api/url`;

    // Check base URL
    if (!baseUrl) {
        return res.status(401).json('Invalid base URL');
    }

    // Create URL code
    const urlCode = shortid.generate();

    try {
        let url = await Url.findOne({ longUrl });

        if (url) {
            res.json(url);
        } else {
            const shortUrl = `${baseUrl}/${urlCode}`;

            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            });

            await url.save();

            res.json(url);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

// GET /api/url/:code
router.get('/:code', async (req, res) => {
    console.log(`Received request for code: ${req.params.code}`);

    try {
        console.log(`Received request for code: ${req.params.code}`);
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            console.log(`Redirecting to: ${url.longUrl}`);
            return res.redirect(url.longUrl);
        } else {
            console.log('No URL found');
            return res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json('Server error');
    }
});

module.exports = router;
