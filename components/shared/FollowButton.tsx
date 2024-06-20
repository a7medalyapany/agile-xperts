"use client";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { FollowUserParams } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { followUser, unfollowUser } from "@/lib/actions/follow.action";
// import { useToast } from "@/components/ui/use-toast";

interface FollowButtonProps extends FollowUserParams {
  Following: boolean;
  className?: string;
}

const FollowButton: FC<FollowButtonProps> = ({
  userId,
  targetUserId,
  Following,
  className,
}) => {
  const pathname = usePathname();
  //   const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState<boolean>(Following);

  const handleFollowToggle = async () => {
    try {
      if (!userId || !targetUserId) {
        // return toast({
        //   title: "You need to be logged in",
        //   description: "Please login to follow this user",
        // });
      }

      if (isFollowing) {
        await unfollowUser({
          userId,
          targetUserId,
          path: pathname,
        });
        setIsFollowing(false);
      } else {
        await followUser({
          userId,
          targetUserId,
          path: pathname,
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      className={cn(
        `paragraph-medium hover:bg-foreground hover:text-background min-w-[120px] rounded-lg px-4 py-3 ${
          Following
            ? "bg-muted hover:bg-muted text-foreground hover:text-foreground border hover:border-red-500"
            : ""
        }`,
        className
      )}
      onClick={handleFollowToggle}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
