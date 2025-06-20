// /api/razorpay/subscribe.ts
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { razorpay } from "@/lib/razorpay";
import { clerkClient } from "@clerk/clerk-sdk-node";
import prismadb from "@/lib/prismadb";
import { PlanName } from "@/lib/generated/prisma";

export async function POST() {
 try {
  const {userId} = await auth();
  const user = await currentUser();

  if(!userId || !user){
    return new NextResponse("Unauthorized", {status: 401});
  }

  //Create a Razorpay customer
  const customer = await razorpay.customers.create({
    name: user.firstName || "User",
    email: user.emailAddresses[0].emailAddress,
  });

  //Create a Subscription
  const subscription = await razorpay.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID!,
    customer_notify: 1,
    total_count: 12,
    customer_id: customer.id,
  });

  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      razorpaySubscriptionId: subscription.id,
    },
  });

  await prismadb.userSubscription.upsert({
    where: { userId },
    update: {
      razorpayCustomerId: customer.id,
      razorpaySubscriptionId: subscription.id,
      isActive: true,
      planName: PlanName.Pro,
    },
    create: {
      userId,
      razorpayCustomerId: customer.id,
      razorpaySubscriptionId: subscription.id,
      isActive: true,
      planName: PlanName.Pro,
    },
  })
  
  return NextResponse.json({subscriptionId: subscription.id});

 } catch (error) {
   console.error("[RAZORPAY_SUBSCRIBE_ERROR]", error);
   return new NextResponse("Internal Error", {status: 500})
 }
}
