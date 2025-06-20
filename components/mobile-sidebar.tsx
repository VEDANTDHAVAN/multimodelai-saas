"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
  apiLimitCount: number;
}

const MobileSidebar = ({
  apiLimitCount = 0
}: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  },[]);

  if(!isMounted){
    return null;
  }

  return (
    <Sheet>
     <SheetTrigger>
     <Button variant="ghost" size="icon" className="md:hidden" asChild>
      <Menu />  
     </Button> 
     </SheetTrigger> 
     <SheetContent side="left" className="p-0">
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
      <SideBar apiLimitCount={apiLimitCount} />
     </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar;