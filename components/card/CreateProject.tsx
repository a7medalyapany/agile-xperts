import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HomeCardInfo } from "@/constants";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import LinkGitHub from "@/components/shared/LinkGitHub";
import { checkUserIdentity } from "@/lib/actions/user.action";

interface CreateProjectProps {
  userRole: string;
}

const CreateProject: FC<CreateProjectProps> = async ({ userRole }) => {
  const { identitiesNumber, hasGitHubIdentity } = await checkUserIdentity();

  return (
    <Card className="flex flex-col justify-between space-y-5 drop-shadow-lg sm:col-span-2">
      <CardHeader className="pb-0">
        <CardTitle>
          {userRole === "pro"
            ? HomeCardInfo.pro.title
            : HomeCardInfo.general.title}
        </CardTitle>
      </CardHeader>
      <p className="px-2 text-sm text-muted-foreground">
        {userRole === "pro"
          ? HomeCardInfo.pro.description
          : HomeCardInfo.general.description}
      </p>
      <CardFooter className="flex w-full justify-end gap-2">
        {!hasGitHubIdentity ? (
          <LinkGitHub
            connected={hasGitHubIdentity}
            identitiesNumber={identitiesNumber}
            className="w-full"
          />
        ) : (
          <div className="flex w-full flex-row-reverse gap-2">
            {userRole === "pro" && (
              <Link
                href="/create-project"
                className={buttonVariants({ variant: "default" })}
              >
                Create Project
              </Link>
            )}
            <Link
              href="/lobby"
              className={cn(
                buttonVariants({ size: "default" }),
                "w-full bg-foreground hover:bg-foreground/80 text-background"
              )}
            >
              Join Project
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateProject;
