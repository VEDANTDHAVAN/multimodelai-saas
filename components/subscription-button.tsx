"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onClick = async () => {
    try {
      setLoading(true);

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const response = await axios.post("/api/razorpay/subscribe");
      const { subscriptionId } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        name: "Multimodal AI SaaS",
        description: "Pro Plan Subscription",
        subscription_id: subscriptionId,
        handler: function () {
          alert("Subscription successful!");
          window.location.reload(); // refresh to reflect changes
        },
        prefill: {
          name: "", // auto-filled if user info is available
          email: "",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("RAZORPAY_SUBSCRIBE_ERROR", error);
      toast.error("Something went wrong while subscribing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={loading} variant={isPro ? "default" : "upgrade"} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
