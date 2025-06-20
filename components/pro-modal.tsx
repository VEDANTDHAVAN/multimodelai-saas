"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { tools } from "@/constants";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const ProModal = () => {
  const proModal = useProModal();
  const router = useRouter();
  
  const onSubscribe = async () => {
    try {
      router.push("/settings");
    } catch (error) {
      console.log(error, "Clerk Billing Error")
    }
  }

  return (
    <div>
     <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
       <DialogHeader>
        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
         <div className="flex items-center gap-x-2 font-bold py-1">
         ⚡Upgrade to Omnigen
         <Badge className="uppercase text-sm py-1" variant="premium">
          Pro  
         </Badge>   
         </div>
        </DialogTitle>
        <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium border-0">
         {tools.map((tool) => (
           <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
             <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn("w-6 h-6", tool.color)}/>
             </div>
             <div className="font-bold text-sm">{tool.label}</div>
             <Check className="ml-36 w-6 h-6" />
            </div>
           </Card> 
         ))}
        </div>
       </DialogHeader>
       <DialogFooter>
        <Button 
          onClick={onSubscribe}
          size="lg" 
          className="w-full" 
          variant="upgrade"
        >
          Upgrade <Zap className="fill-white ml-2"/>  
        </Button>
       </DialogFooter>
      </DialogContent>  
     </Dialog> 
    </div>
  )
}