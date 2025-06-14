"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNT } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
    apiLimitCount: number;
}

export const FreeCounter = ({apiLimitCount = 0}: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);   
  useEffect(() => {
    setMounted(true);
  },[]);

  if(!mounted){
    return null;
  }

  return (
    <div className="px-3">
     <Card className="bg-white/10 border-0">
      <CardContent className="py-6">
       <div className="text-center text-sm text-white mb-4 space-y-2">
        <p>{apiLimitCount} / {MAX_FREE_COUNT} Free Generations</p>
        <Progress className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-green-500" value={(apiLimitCount/MAX_FREE_COUNT)*100} />
       </div>  
       <Button onClick={proModal.onOpen} variant="upgrade" className="w-full font-bold cursor-pointer">
        Upgrade <Zap className="w-4 h-4 fill-white"/>
       </Button>
      </CardContent>  
     </Card>
    </div>
  )
}