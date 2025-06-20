import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkProServer } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, resolution } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid or missing prompt" }, { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkProServer();
    if(!freeTrial && !isPro) {
      return new NextResponse("Free Trial has Expired!!", {status: 403});
    }

    const [width, height] = resolution.split('x').map(Number);
    
    console.log("🚀 Generating image:", { prompt, width, height });

    const response = await axios.post(
      'https://api.together.xyz/v1/images/generations',
      {
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt,
        width,
        height,
        steps: 4,
        n: 1,
        response_format: "url"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.data || !response.data.data[0]?.url) {
      return NextResponse.json({
        error: "No image generated",
        success: false
      });
    }

    if(!isPro){
      await increaseApiLimit();
    }

    return NextResponse.json({ 
      images: [response.data.data[0].url],
      success: true,
      count: 1
    });

  } catch (error: unknown) {
    let errorMessage = 'Failed to generate image';
    if (typeof error === 'object' && error !== null) {
      if ('response' in error && typeof (error as any).response?.data === 'string') {
        errorMessage = (error as any).response.data;
      } else if ('message' in error && typeof (error as any).message === 'string') {
        errorMessage = (error as any).message;
      }
    }
    console.error("❌ Image generation error:", errorMessage);
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false
      },
      { status: 500 }
    );
  }
}