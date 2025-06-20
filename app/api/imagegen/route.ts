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

  } catch (error: any) {
    console.error("❌ Image generation error:", error?.response?.data || error?.message || error);
    
    return NextResponse.json(
      { 
        error: error?.response?.data?.error?.message || error?.message || 'Failed to generate image',
        success: false
      },
      { status: 500 }
    );
  }
}