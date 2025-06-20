import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import clerkClient from "@clerk/clerk-sdk-node";
import { razorpay } from "@/lib/razorpay";

export async function GET() {
 try {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await clerkClient.users.getUser(userId);
  const razorpaySubscriptionId = user.privateMetadata?.razorpaySubscriptionId;

  if(!razorpaySubscriptionId){
    return NextResponse.json({ isPro: false });
  }

  const razorpaySub = await razorpay.subscriptions.fetch(razorpaySubscriptionId);

  const isPro = razorpaySub.status === "active" || razorpaySub.status === "authenticated";

  return NextResponse.json({isPro: isPro});
 } catch (error) {
   console.error("[USER_SUBSCRIPTION_GET_ERROR]", error);
   return new NextResponse("Internal Error", {status: 500});
 }
}
