import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: 'https://api.deepseek.com/v1' });
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'system', content: 'You are an expert academic writing instructor. Build clear thesis statements and detailed essay outlines.' }, { role: 'user', content: prompt }],
      max_tokens: 1200,
      temperature: 0.7,
    });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || 'No result.' });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
