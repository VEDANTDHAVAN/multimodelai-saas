import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages;

    // Validate format: make sure each message has 'role' and 'content'
    const isValid = Array.isArray(messages) && messages.every(
      (msg) => msg.role && typeof msg.content === "string"
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...messages
        ],
        max_tokens: 512,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return NextResponse.json({ result: response.data.choices[0].message.content, });
  } catch (error: any) {
    console.error("LLaMA API Conversation error:", error.response?.data || error.message || error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
