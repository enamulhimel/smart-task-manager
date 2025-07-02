import { generateSubtasks } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { title, description } = await request.json();

  try {
    const subtasks = await generateSubtasks(title, description);
    return NextResponse.json({ subtasks });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate subtasks' },
      { status: 500 }
    );
  }
}