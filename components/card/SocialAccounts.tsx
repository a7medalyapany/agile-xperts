import { FC, JSX } from "react";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { socialMediaAccounts } from "@/types/global";
import { Icons } from "@/components/svg-icons/icons";
import { Separator } from "@/components/ui/separator";
import { getGitHubUsername } from "@/lib/utils";

interface SocialAccountsProps {
  socialMedia: socialMediaAccounts[];
}

const platformIcons: { [key: string]: JSX.Element } = {
  Google: <Icons.google className="size-4" />,
  LinkedIn: <Icons.linkedIn className="size-3" />,
  X: <Icons.twitter className="size-4 dark:invert" />,
  Facebook: <Icons.facebook className="size-3" />,
  Instagram: <Icons.instagram className="size-3" />,
  Other: <LinkIcon className="size-4" />,
};

const SocialAccounts: FC<SocialAccountsProps> = async ({ socialMedia }) => {
  if (socialMedia.length === 0 || socialMedia === null) {
    return (
      <Card className="hidden items-center justify-around p-1.5 drop-shadow-md sm:flex sm:grow">
        <p>No social media accounts found</p>
      </Card>
    );
  }

  const githubUsername = getGitHubUsername(socialMedia);

  socialMedia = socialMedia.filter((account) => account.platform !== "GitHub");

  return (
    <Card className="flex grow flex-wrap items-center justify-around p-1.5 drop-shadow-md">
      {socialMedia.length > 0 &&
        socialMedia.map((account) => (
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
          {socialMedia.length > 0 && <Separator orientation="vertical" />}
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
