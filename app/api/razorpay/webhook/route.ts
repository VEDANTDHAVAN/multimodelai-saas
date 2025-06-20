import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  // Handle different Razorpay events here
  switch (event.event) {
    case "subscription.activated":
      console.log("Subscription activated:", event.payload.subscription.id);
      // You can update your DB to mark subscription as active
      break;

    case "subscription.cancelled":
      console.log("Subscription cancelled:", event.payload.subscription.id);
      // Update DB to reflect cancellation
      break;

    case "invoice.paid":
      console.log("Invoice paid:", event.payload.invoice.id);
      // Log payment info
      break;

    case "payment.failed":
      console.warn("Payment failed:", event.payload.payment.id);
      // Handle failures if needed
      break;

    default:
      console.log("Unhandled event:", event.event);
  }

  return new NextResponse("Webhook received", { status: 200 });
}
