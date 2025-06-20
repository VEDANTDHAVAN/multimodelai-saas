"use client";

import { Heading } from "@/components/heading"
import { SubscriptionButton } from "@/components/subscription-button";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react"
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const user = useUser();
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkPlan = async () => {
      try {
        const res = await fetch('/api/user/subscription');
        const data = await res.json();

        if(data.isPro){
          setIsPro(true);
        }
      } catch (error) {
        console.error("Failed to fetch subscription status", error);
      }
    };
    checkPlan();
  }, []);

  return (
    <div>
      <Heading 
       title="Settings" description="Manage Account settings."
       icon={SettingsIcon} iconColor="text-orange-500" bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
       <div className="text-muted-foreground text-sm">
        {isPro ? "You are currently on a Pro Plan.":"You are currently on a Free Plan."}
       </div>
       <SubscriptionButton isPro={isPro}/>
      </div>
    </div>
  )
}
