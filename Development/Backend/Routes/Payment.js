const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/khalti-Merchant-api', async (req, res) => {
    try {
        const payload = req.body;
        const khaltiResponse = await axios.post(
            "https://a.khalti.com/api/v2/epayment/initiate/",
            payload,
            {
                headers: {
                    Authorization: `Key c36979a42ed4458fb68c248652d19985`,
                },
            }
        );

        // Check if Khalti response is successful
        if (khaltiResponse.status === 200) {
            res.status(200).send({ success: true, khaltiResult: khaltiResponse.data });
        } else {
            res.status(400).send({ success: false, message: "Khalti API returned an error." });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: "An error occurred while processing the request." });
    }
});

module.exports = router;
