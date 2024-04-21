import { FC } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface CreateProjectProps {}

const CreateProject: FC<CreateProjectProps> = () => {
  return (
    <Card className="space-y-5 sm:col-span-2">
      <CardHeader className="">
        <CardTitle>Create a New Project</CardTitle>
        <CardDescription className="max-w-lg text-balance">
          Available to Pro Users and GitHub linked accounts only.
        </CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          className="w-full bg-foreground text-background"
        >
          Link GitHub
        </Button>
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
