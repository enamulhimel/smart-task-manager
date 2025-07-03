import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    apiKeyExists: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    apiKeyLength: process.env.NEXT_PUBLIC_GEMINI_API_KEY?.length,
    nodeEnv: process.env.NODE_ENV
  });
}