

import { generateSubtasks } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { error: 'Task title is required' },
        { status: 400 }
      );
    }

    const subtasks = await generateSubtasks(title, description);
    return NextResponse.json({ subtasks });
    
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate subtasks',
        details: error.message
      },
      { status: 500 }
    );
  }
}