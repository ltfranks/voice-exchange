import { Router } from 'express';
import { Configuration, OpenAIApi } from 'openai';
const router = Router();
// Create and configure the OpenAI client
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Make sure your .env is loaded in index.ts
});
const openai = new OpenAIApi(configuration);
/**
 * POST /gpt-completion
 * Body: { prompt: string }
 */
router.post('/gpt-completion', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'No prompt provided' });
        }
        // Request a completion from OpenAI
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 50,
            temperature: 0.7,
        });
        // Extract the text
        const gptText = response.data.choices[0]?.text?.trim() || '';
        return res.json({ text: gptText });
    }
    catch (err) {
        console.error('OpenAI API Error:', err);
        return res.status(500).json({ error: 'Failed to generate completion' });
    }
});
export default router;
