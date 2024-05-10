import { FC } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import LinkGitHub from "@/components/shared/LinkGitHub";
import { checkUserIdentity } from "@/lib/actions/user.action";
import { GitHubForm } from "@/components/form/settings/GitHubForm";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const { hasGitHubIdentity } = await checkUserIdentity();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">GitHub Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your GitHub settings.
        </p>
      </div>
      <Separator />
      {hasGitHubIdentity ? (
        <>
          <LinkGitHub Linked={hasGitHubIdentity} className="w-full" />
          <GitHubForm />
        </>
      ) : (
        <>
          <LinkGitHub Linked={hasGitHubIdentity} className="w-full" />
          <Image
            src={"/assets/images/settings-image.svg"}
            alt="Hello"
            width={600}
            height={600}
            className="size-fit"
          />
        </>
      )}
    </div>
  );
};

export default Page;
