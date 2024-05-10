"use client";
import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { UnLinkGitHub, linkGitHub } from "@/lib/actions/auth.action";

interface LinkGitHubProps {
  Linked: boolean;
  className?: string;
}

const LinkGitHub: FC<LinkGitHubProps> = ({ Linked, className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLinked, setIsLinked] = useState<boolean>(Linked);

  const handleLinkeGitHub = async () => {
    console.log("BEFORE ____ handleLinkeGitHub");
    try {
      if (isLinked) {
        await UnLinkGitHub(pathname);
        setIsLinked(false);
        console.log("AFTER ____UN LinkeGitHub");
      } else {
        const url = await linkGitHub(pathname);
        console.log("url", url);
        if (typeof url === "string") {
          setIsLinked(true);
          console.log("Im here");
          router.push(url);
        }
        console.log("AFTER ____ handleLinkeGitHub");
      }
    } catch (error) {
      console.error("Error toggling link github:", error);
    }
  };

  return (
    <Button
      className={cn(
        `paragraph-medium bg-foreground hover:bg-foreground text-background min-w-[120px] rounded-lg px-4 py-3 ${
          isLinked
            ? "bg-muted hover:bg-muted text-foreground border hover:border-red-500"
            : ""
        }`,
        className
      )}
      onClick={handleLinkeGitHub}
    >
      {isLinked ? "Unlink GitHub" : "Link GitHub"}
    </Button>
  );
};

export default LinkGitHub;
