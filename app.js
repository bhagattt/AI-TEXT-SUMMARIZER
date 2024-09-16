const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.use(express.json()); 



async function summarizeText(req, res) {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('Text is required');
    }

    try {

        const response = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            { inputs: text },
            {
                headers: {
                    'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`, 
                    'Content-Type': 'application/json',
                },
            }
        );

        
        const summary = response.data[0].summary_text;
        res.json({ summary });

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while summarizing the text');
    }
}

app.post('/summarize', summarizeText);

app.listen(3000);
