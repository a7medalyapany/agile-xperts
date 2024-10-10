"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  FC,
  useOptimistic,
  useTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { FollowUserParams } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  followUser,
  unfollowUser,
  checkIsFollowing,
} from "@/lib/actions/follow.action";

interface FollowButtonProps extends FollowUserParams {
  className?: string;
}

const FollowButton: FC<FollowButtonProps> = ({
  targetUserId,
  userId,
  className,
}) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  const [optimisticFollowing, optimisticToggleFollow] = useOptimistic(
    isFollowing,
    (state: boolean | null, newState: boolean) => newState
  );

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (targetUserId && userId) {
        try {
          const followStatus = await checkIsFollowing({ targetUserId, userId });
          setIsFollowing(followStatus);
        } catch (error) {
          console.error("Error checking follow status:", error);
          toast.error("Failed to check follow status");
        }
      }
    };

    checkFollowStatus();
  }, [targetUserId, userId]);

  const handleFollowToggle = useCallback(() => {
    if (!targetUserId || !userId) {
      toast.error("User information is missing");
      return;
    }

    const newFollowingState = !optimisticFollowing;
    optimisticToggleFollow(newFollowingState);

    startTransition(async () => {
      try {
        if (newFollowingState) {
          await followUser({ targetUserId, userId, path: pathname });
        } else {
          await unfollowUser({ targetUserId, userId, path: pathname });
        }
        setIsFollowing(newFollowingState);
      } catch (error) {
        // Revert optimistic update on error
        optimisticToggleFollow(!newFollowingState);
        setIsFollowing(!newFollowingState);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        toast.error(errorMessage);
      }
    });
  }, [
    optimisticFollowing,
    targetUserId,
    userId,
    pathname,
    optimisticToggleFollow,
  ]);

  // Don't render the button for self-follow or if the target user ID is invalid
  if (targetUserId === userId || !targetUserId || isFollowing === null) {
    return null;
  }

  return (
    <Button
      variant={optimisticFollowing ? "outline" : "default"}
      className={cn(
        `paragraph-medium hover:bg-foreground hover:text-background min-w-[120px] rounded-lg px-4 py-3`,
        optimisticFollowing &&
          "bg-muted hover:bg-muted text-foreground hover:text-foreground border hover:border-red-500",
        className
      )}
      onClick={handleFollowToggle}
      disabled={isPending}
    >
      {optimisticFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
