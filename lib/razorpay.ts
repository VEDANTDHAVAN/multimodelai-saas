import { auth } from "@clerk/nextjs/server";
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
}) as unknown; // disable strict types

export const checkProServer = async (): Promise<boolean> => {
  const { userId } = await auth();
  if(!userId) return false;
  try {
    // Step 2: Get all subscriptions for this customer
    const subscriptions = await razorpay.subscriptions.all({
      
    });

    // Step 3: Check if unknown active subscriptions exist
    const activeSub = subscriptions.items.find(
      (sub: unknown) => sub.status === "active" || sub.status === "authenticated"
    );

    return !!activeSub;
  } catch (error) {
    console.error("[RAZORPAY_PRO_STATUS_ERROR]", error);
    return false;
  }
}