import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  const {user} = useUser();

  return (
    <Avatar className="h-10 w-10">
     <AvatarImage className="p-1" src="/omnigenlogo.png" />
    </Avatar>
  )
} 