"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
   const { isSignedIn } = useAuth();

    return (
      <div className="text-white font-bold py-36 text-center space-y-5">
       <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-bold"> 
        <h1>Power Your Ideas with</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-yellow-300">
         <TypewriterComponent options={{
           strings: ["Chatbot.", "Photo Generation.", "Code Generation.", ],
           autoStart: true, loop: true 
         }} />
        </div>
       </div>
       <div className="text-sm md:text-xl font-light text-zinc-400">
       Build faster, smarter, and more creatively than ever before.
       </div>
       <div>
        <Link href={isSignedIn ? "/dasboard": "/sign-up"}>
         <Button variant="upgrade" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start Generating For Free
         </Button>
        </Link>
       </div>
       <div className="text-zinc-300 text-xs md:text-sm font-normal">
        No Credit Card required.
       </div>
      </div>  
    )
}