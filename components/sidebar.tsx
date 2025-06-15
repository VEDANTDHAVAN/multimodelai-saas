"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Code2, ImagesIcon, LayoutDashboard, MessageSquare, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-green-600",
  },
  {
    label: "Image Generation",
    icon: ImagesIcon,
    href: "/imagegen",
    color: "text-purple-500",
  },
  {
    label: "Code Generation",
    icon: Code2,
    href: "/codegen",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-orange-300",
  },
];

const SideBar = () => {
  const pathName = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#1b2742] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/omnigenlogo.png" className="rounded-full" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>Omnigen</h1>
        </Link>
      </div>
      <div className="space-y-2">
        {routes.map((route) => (
          <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10  rounded-lg transition",
           pathName === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
            <div className="flex items-center flex-1">
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              {route.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideBar