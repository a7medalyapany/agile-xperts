"use client";
import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UnLinkGitHub, linkGitHub } from "@/lib/actions/auth.action";

interface LinkGitHubProps {
  connected: boolean;
  identitiesNumber: number;
  className?: string;
}

const LinkGitHub: FC<LinkGitHubProps> = ({
  connected,
  identitiesNumber,
  className,
}) => {
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState<boolean>(connected);

  const handleLinkeGitHub = async () => {
    try {
      if (isConnected) {
        await UnLinkGitHub(pathname);
        setIsConnected(false);
      } else {
        await linkGitHub(pathname);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Error toggling link github:", error);
    }
  };

  return (
    <Button
      className={cn(
        `paragraph-medium bg-foreground hover:bg-foreground text-background min-w-[120px] rounded-lg px-4 py-3 ${
          isConnected
            ? "bg-muted hover:bg-muted text-foreground border hover:border-red-500"
            : ""
        }`,
        className
      )}
      onClick={handleLinkeGitHub}
      disabled={identitiesNumber === 1 && isConnected}
    >
      {isConnected ? "Unlink GitHub" : "Connect GitHub"}
    </Button>
  );
};

export default LinkGitHub;
