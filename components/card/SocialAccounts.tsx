import { FC } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Icons } from "../svg-icons/icons";

interface SocialAccountsProps {}

const SocialAccounts: FC<SocialAccountsProps> = () => {
  return (
    <Card className="flex justify-between p-1.5 drop-shadow-md">
      <Link
        href={"www.github.com"}
        target="_blank"
        className="flex size-8 items-center justify-center rounded-full bg-primary/30"
      >
        <Icons.gitHub className="size-5" />
      </Link>
      <Link
        href={"www.twitter.com"}
        target="_blank"
        className="flex size-8 items-center justify-center rounded-full bg-primary/30"
      >
        <Icons.twitter className="size-4 dark:invert" />
      </Link>
      <Link
        href={"www.google.com"}
        target="_blank"
        className="flex size-8 items-center justify-center rounded-full bg-primary/30"
      >
        <Icons.google className="size-4" />
      </Link>
      <Link
        href={"www.linkedin.com"}
        target="_blank"
        className="flex size-8 items-center justify-center rounded-full bg-primary/30"
      >
        <Icons.linkedIn className="size-3" />
      </Link>
      <Link
        href={"www.google.com"}
        target="_blank"
        className="flex size-8 items-center justify-center rounded-full bg-primary/30"
      >
        <Icons.facebook className="size-3" />
      </Link>
      <Link
        href={"www.google.com"}
        target="_blank"
        className="flex size-8 items-center justify-center rounded-full bg-primary/30"
      >
        <Icons.instagram className="size-3" />
      </Link>
    </Card>
  );
};

export default SocialAccounts;
