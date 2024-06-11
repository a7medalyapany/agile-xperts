import { FC } from "react";
import { LifeBuoy, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { signOut } from "@/lib/actions/auth.action";
import { Icons } from "@/components/svg-icons/icons";
import { getCurrentUser } from "@/lib/actions/user.action";

interface UserAvatarProps {}

const UserAvatar: FC<UserAvatarProps> = async () => {
  const { id, name, avatar_url: avatarUrl } = await getCurrentUser();

  if (!id) {
    throw new Error("User not logged in");
  }

  const firstLetter = name!.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={avatarUrl!} alt="@userPhoto" />
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            <Link href={`/profile/${id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <Link href={"/settings"}>Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.gitHub className="mr-2 size-4" />
          <Link href={"/settings/github"}>GitHub</Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <LifeBuoy className="mr-2 size-4" />
          <Link href={"/support"}>Support</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={signOut} className="flex w-full items-center">
            <LogOut className="mr-2 size-4" />
            <Button
              variant={"ghost"}
              className="flex h-fit w-full items-center justify-start p-0"
            >
              Log out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
