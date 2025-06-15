import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

const MODELSCOPE_API= "https://api.modelscope.cn/api/v1/models/damo/text-to-video-synthesis/generation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if(!prompt) {
      return NextResponse.json({ error: "Prompt is required!" }, { status: 400 });
    }

    const form = new FormData();
    form.append("text", prompt);

    const response = await axios.post(MODELSCOPE_API, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${process.env.MODELSCOPE_API_TOKEN}`,
      },
      responseType: "json",
    });

    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error("Video Generation error:", error?.response?.data || error?.message || error);
    return NextResponse.json({ error: "Failed to generate video." }, { status: 500 });
  }
}