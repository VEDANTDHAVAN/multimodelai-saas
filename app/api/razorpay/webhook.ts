// /api/razorpay/webhook.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const event = body.event;
  const payload = body.payload;

  const subscriptionId = payload?.subscription?.entity?.id;
  const notes = payload?.subscription?.entity?.notes;
  const userId = notes?.userId;

  if (!subscriptionId || !userId) {
    return new NextResponse("Invalid", { status: 400 });
  }

  if (event === "subscription.activated") {
    await prismadb.userSubscription.update({
      where: { userId },
      data: { isActive: true },
    });
  }

  if (event === "subscription.cancelled" || event === "payment.failed") {
    await prismadb.userSubscription.update({
      where: { userId },
      data: { isActive: false },
    });
  }

  return new NextResponse("Webhook received", { status: 200 });
}
