import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing image URL', { status: 400 });
  }

  try {
    const imageRes = await fetch(imageUrl);

    if (!imageRes.ok) {
      return new NextResponse('Failed to fetch image from source', { status: 500 });
    }

    const imageBuffer = await imageRes.arrayBuffer();
    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename="downloaded-image.jpeg"',
      },
    });
  } catch (error) {
    return new NextResponse('Proxy failed', { status: 500 });
  }
}
