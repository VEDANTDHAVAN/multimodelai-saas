"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const testimonials = [
    {
      name: "Alicia Tan",
      avatar: "AT",
      title: "Product Designer, PixelBloom",
      description:
        "Omnigen has completely streamlined my creative workflow. I can prototype UI ideas, generate visuals, and even mock videos within minutes. It’s my go-to AI companion.",
    },
    {
      name: "Raj Mehta",
      avatar: "RM",
      title: "Full Stack Developer, CodeNest",
      description:
        "The code generation tool inside Omnigen is next-level. It understands context and builds clean, scalable code snippets faster than I imagined. Huge time-saver!",
    },
    {
      name: "Isabella Ruiz",
      avatar: "IR",
      title: "Content Strategist, BoldVoice",
      description:
        "As someone managing multiple campaigns, Omnigen helps me create unique video and music assets that are truly brand-consistent — no need for separate tools.",
    },
    {
      name: "Ethan Wu",
      avatar: "EW",
      title: "Founder, StartupForge",
      description:
        "Omnigen reduced our dependency on agencies. We prototype product demos, marketing creatives, and landing pages with AI — and it all just works.",
    },
  ];
  

export const LandingContent = () => {
    return (
    <div className="px-10 pb-20">
     <h2 className="text-center text-4xl mb-10 text-white font-extrabold">
      Testimonials
     </h2>    
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {testimonials.map((item) => (
        <Card key={item.description} className="bg-[#24355a] border-none text-white">
         <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
           <div>
            <p className="text-lg"><Button variant="upgrade">{item.avatar}</Button> {item.name}</p>
            <p className="text-zinc-400 text-sm">{item.title}</p>
           </div>
          </CardTitle>  
          <CardContent className="pt-4 px-0">
           {item.description} 
          </CardContent> 
         </CardHeader>   
        </Card>
      ))}
     </div>
    </div>
    )
}