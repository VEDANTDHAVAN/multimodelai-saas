"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code2, ImagesIcon, MessageSquare, Music4, VideoIcon } from "lucide-react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImagesIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/imagegen",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/videogen",
  },
  {
    label: "Music Generation",
    icon: Music4,
    color: "text-emerald-200",
    bgColor: "bg-emerald-500/10",
    href: "/musicgen",
  },
  {
    label: "Code Generation",
    icon: Code2,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/codegen",
  },
];

const DashboardPage = () => {
  return (
  <div>
   <div className="mb-8 space-y-4">
    <h2 className="text-2xl md:text-4xl font-bold text-center font-mono">From Thought to Reality — Powered by AI.</h2>
    <p className="font-semibold text-gray-500 text-sm md:text-lg text-center">Your Gateway to Infinite Creation</p>
   </div>
   <div className="px-4 md:px-20 lg:px-32 space-y-4">
    {tools.map((tool) => (
      <Card key={tool.href} 
       className="p-4 border-black/5 flex items-center justify-between hover:shadow-lg hover:bg-yellow-100 transition cursor-pointer" >
       <div className="items-center gap-x-4 pl-20 flex">
        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
         <tool.icon className={cn("w-10 h-10", tool.color)} />
        </div>
        <div className="font-semibold text-2xl md:text-3xl">
         {tool.label}
        </div>  
        <div className="ml-72"><ArrowRight className="w-5 h-5" /></div>
       </div>
      </Card>
    ))}
   </div>
  </div>    
  );
}

export default DashboardPage;