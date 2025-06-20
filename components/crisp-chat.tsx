"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
   useEffect(() => {
    Crisp.configure("fbffc9fa-443a-47b1-8768-67b7bb7a0d08");
   }, []); 

   return null;
}