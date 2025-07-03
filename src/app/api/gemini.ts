// /pages/api/gemini.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const prompt = `
You are a productivity assistant. Based on the following task, suggest a list of specific action steps (subtasks) someone should take to complete it.

Task title: "${title}"
Task description: "${description || 'No description'}"

Please return the subtasks as a plain list (no numbering or explanations).
`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GOOGLE_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const result = await response.json();

    const textOutput = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textOutput) {
      return res.status(500).json({ message: 'No subtasks returned by AI' });
    }

    // Split subtasks by line 
    const subtasks = textOutput
      .split('\n')
      .map((line: string) => line.replace(/^[-*•\d. ]+/, '').trim())
      .filter((line: string) => line.length > 0);

    return res.status(200).json({ subtasks });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ message: 'Failed to fetch subtasks from Gemini API' });
  }
}
