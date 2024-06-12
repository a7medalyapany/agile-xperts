import { FC, JSX } from "react";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/svg-icons/icons";
import { Separator } from "@/components/ui/separator";
import { getUserSocialMedia } from "@/lib/actions/user.action";

interface SocialAccountsProps {
  profileId: string;
  githubUsername?: string;
}

const platformIcons: { [key: string]: JSX.Element } = {
  Google: <Icons.google className="size-4" />,
  LinkedIn: <Icons.linkedIn className="size-3" />,
  X: <Icons.twitter className="size-4 dark:invert" />, // Assuming 'X' is for Twitter
  Facebook: <Icons.facebook className="size-3" />,
  Instagram: <Icons.instagram className="size-3" />,
  Other: <LinkIcon className="size-4" />, // Default icon
};

const SocialAccounts: FC<SocialAccountsProps> = async ({
  profileId,
  githubUsername,
}) => {
  const data = await getUserSocialMedia(profileId);

  if (data.length === 0 && !githubUsername) {
    return null; // Don't render the card if no social media accounts and no GitHub username
  }

  return (
    <Card className="flex grow flex-wrap items-center justify-around p-1.5 drop-shadow-md">
      {data.length > 0 &&
        data.map((account) => (
          <Link
            key={account.id}
            href={account.account_link}
            target="_blank"
            className="flex size-8 items-center justify-center rounded-full bg-primary/30"
          >
            {platformIcons[account.platform] || platformIcons.Other}
          </Link>
        ))}

      {githubUsername && (
        <>
          {data.length > 0 && <Separator orientation="vertical" />}
          <Link
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            className="flex size-8 items-center justify-center rounded-full bg-primary/30"
          >
            <Icons.gitHub className="size-5" />
          </Link>
        </>
      )}
    </Card>
  );
};

export default SocialAccounts;
