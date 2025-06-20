import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkProServer } from '@/lib/razorpay';

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

    const freeTrial = await checkApiLimit();
    const isPro = await checkProServer();
    if(!freeTrial && !isPro) {
      return new NextResponse("Free Trial has Expired!!", {status: 403});
    }

    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: "meta-llama/Llama-3-8b-chat-hf",
        messages: [
          { role: 'system', 
            content: 'You are a Code generator. You must answer only in markdown code snippets. Use code comments for explainations.' },
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

    if(!isPro){
      await increaseApiLimit();
    }

    return NextResponse.json({ result: response.data.choices[0].message.content, });
  } catch (error: any) {
    console.error("LLaMA API Code Generation error:", error.response?.data || error.message || error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
