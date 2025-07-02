import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in environment.");
  return NextResponse.json({ error: 'Server config error: missing API key' }, { status: 500 });
}

  try {
    const { title, description } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: 'Task title is required' },
        { status: 400 }
      );
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Break down the following task into 3-5 smaller, actionable steps. 
    Return only the steps as a bulleted list with no additional text or explanations.
    
    Task: ${title}
    ${description ? `Description: ${description}` : ''}`
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const subtasks = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\./))
      .map(line => line
        .replace(/^[-•]\s*/, '')  
        .replace(/^\d+\.\s*/, '')
        .trim()
      )
      .filter(Boolean);

    if (subtasks.length === 0) {
      return NextResponse.json(
        { error: 'No actionable steps could be extracted from the response' },
        { status: 500 }
      );
    }

    return NextResponse.json({ subtasks });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate subtasks. Please try again.',details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}



