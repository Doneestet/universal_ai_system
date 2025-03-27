import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a task analysis assistant. For each task, provide:
1. A list of subtasks (using bullet points)
2. Estimated time to complete
3. Task complexity (simple/medium/complex)
4. Required resources or tools
5. Additional notes or recommendations

Format your response like this:
Subtasks:
- First subtask
- Second subtask
...

Time: X hours/minutes

Complexity: simple/medium/complex

Resources:
- Resource 1
- Resource 2

Notes:
Any additional notes or recommendations`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('API Route: /api/analyze-task');
    console.log('Method:', req.method);
    console.log('Body:', req.body);
    console.log('OpenAI API Key configured:', !!process.env.OPENAI_API_KEY);

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { task } = req.body;

        if (!task) {
            console.error('No task provided in request body');
            return res.status(400).json({ message: 'Task is required' });
        }

        console.log('Sending request to OpenAI...');
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `Analyze this task and provide a structured breakdown: ${task}`
                }
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        console.log('OpenAI response received');
        const analysis = completion.choices[0].message.content;
        console.log('Analysis:', analysis);

        res.status(200).json({ analysis });
    } catch (error) {
        console.error('Error analyzing task:', error);
        res.status(500).json({
            message: 'Error analyzing task',
            error: error instanceof Error ? error.message : String(error)
        });
    }
} 