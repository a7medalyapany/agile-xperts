import { FC } from "react";
import Image from "next/image";
import { URLProps } from "@/types";
import { Separator } from "@/components/ui/separator";

import LinkGitHub from "@/components/shared/LinkGitHub";
import { checkUserIdentity } from "@/lib/actions/user.action";
import { GitHubForm } from "@/components/form/settings/GitHubForm";

interface pageProps extends URLProps {}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const { identitiesNumber, hasGitHubIdentity, githubUsername } =
    await checkUserIdentity();
  const errorMessages = searchParams.message;
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">GitHub Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your GitHub settings.
        </p>
      </div>
      <Separator />
      {errorMessages && (
        <div className="mb-2 rounded-lg bg-card/50 py-2 text-center text-destructive dark:bg-muted">
          {errorMessages}
        </div>
      )}
      {hasGitHubIdentity ? (
        <>
          <LinkGitHub
            connected={hasGitHubIdentity}
            identitiesNumber={identitiesNumber}
            className="w-full"
          />
          <GitHubForm githubUsername={githubUsername!} />
        </>
      ) : (
        <>
          <LinkGitHub
            connected={hasGitHubIdentity}
            identitiesNumber={identitiesNumber}
            className="w-full"
          />
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
