import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(request: Request) {
  const { title, description } = await request.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Break down the following task into 3-5 smaller, actionable steps. 
    Return only the steps as a bulleted list with no additional text or explanations.
    
    Task: ${title}
    ${description ? `Description: ${description}` : ''}
    
    Example output format:
    - Step 1
    - Step 2
    - Step 3`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract bullet points and clean them up
    const subtasks = text.split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^- /, '').trim())
      .filter(Boolean); // Remove empty items

    if (subtasks.length === 0) {
      throw new Error('No subtasks were generated');
    }

    return NextResponse.json({ subtasks });
  } catch (error) {
    console.error('Error generating subtasks:', error);
    return NextResponse.json(
      { error: 'Failed to generate subtasks. Please try again.' },
      { status: 500 }
    );
  }
}