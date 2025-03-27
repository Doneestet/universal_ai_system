import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { task } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that analyzes tasks and breaks them down into subtasks. Provide structured, actionable steps."
                },
                {
                    role: "user",
                    content: `Analyze this task and break it down into subtasks: ${task}`
                }
            ],
        });

        const analysis = completion.choices[0].message.content;

        res.status(200).json({ analysis });
    } catch (error) {
        console.error('Error analyzing task:', error);
        res.status(500).json({ message: 'Error analyzing task' });
    }
} 