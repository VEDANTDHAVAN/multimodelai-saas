import { Code2, ImagesIcon, MessageSquare } from "lucide-react";

export const MAX_FREE_COUNT = 5;

export const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Image Generation",
      icon: ImagesIcon,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Code Generation",
      icon: Code2,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];