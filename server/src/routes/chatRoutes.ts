import express, {Request, Response} from 'express';
import {OpenAI} from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// GET /chat - Health check or info route
router.get('/', (req: Request, res: Response): void => {
    res.send('Chat endpoint is live! Use POST to send messages.');
});
router.post('/', async (req: Request, res: Response): Promise<void> => {
    const {message} = req.body;
    if (!message) {
        res.status(400).json({error: 'Message is required'});
        return;
    }

    try {
        const response = await openai.chat.completions.create({
            messages: [
                {role: 'system', content: 'You are a helpful assistant.'},
                {role: 'user', content: message},
            ],
            model: 'gpt-3.5-turbo', // any model
        });

        res.json({reply: response.choices[0]?.message?.content});
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({error: 'An error occurred while processing your request.'});
    }
});

export default router;
