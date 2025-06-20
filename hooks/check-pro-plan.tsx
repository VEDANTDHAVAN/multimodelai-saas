"use client";

import { useEffect, useState } from "react";


const checkProPlan = () => {
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkPlan = async () => {
        try{
          const res = await fetch("/api/user/subscription");
          const data = await res.json();
          
          if(data.isPro){
            setIsPro(true);
          }
        }catch (err){
           console.error("Failed to fetvh Subscription status!!", err); 
        } finally{
            setLoading(false);
        }
    };
    checkPlan();
  }, []);
  return isPro;
};

export default checkProPlan;