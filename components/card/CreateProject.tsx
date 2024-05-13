import { FC } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import LinkGitHub from "../shared/LinkGitHub";
import { checkUserIdentity } from "@/lib/actions/user.action";

interface CreateProjectProps {}

const CreateProject: FC<CreateProjectProps> = async () => {
  const { identitiesNumber, hasGitHubIdentity } = await checkUserIdentity();

  return (
    <Card className="space-y-5 sm:col-span-2">
      <CardHeader className="">
        <CardTitle>Create a New Project</CardTitle>
        <CardDescription className="max-w-lg text-balance">
          Available to Pro Users and GitHub linked accounts only.
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full gap-2">
        <LinkGitHub
          connected={hasGitHubIdentity}
          identitiesNumber={identitiesNumber}
          className="w-full "
        />
        <Link
          href={"/create-project"}
          className={buttonVariants({
            variant: "default",
          })}
        >
          Create Project
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CreateProject;
