import { FC } from "react";
import { ArrowUpRight, MoreVertical } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import ReadMore from "../shared/ReadMore";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

import { projectsData } from "@/constants/dummy";

interface ProjectDetailsProps {
  projectId: string;
  openProject?: boolean;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({
  projectId,
  openProject = false,
}) => {
  const project = projectsData.find((project) => project.id === projectId);
  return (
    <Card className="overflow-hidden drop-shadow-md">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {project!.title}
          </CardTitle>
          <CardDescription className="text-start text-sm text-muted-foreground">
            <Link
              href={`/profile/${project?.ownerId}`}
              className="hover:underline"
            >
              @owner
            </Link>
          </CardDescription>
        </div>

        <div className="ml-auto flex items-center gap-1">
          {openProject && (
            <Link
              href={`/project/${project!.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: 'className="h-8 gap-1"',
              })}
            >
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                Open
              </span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="size-8">
                <MoreVertical className="size-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  href={`/project/settings/${project!.id}`}
                  className="w-full"
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Leave</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Description</div>
          <ul className="grid gap-3">
            <ReadMore
              maxLength={200}
              className="text-muted-foreground"
              text={project!.description}
            />
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Members</div>
          <ul className="grid gap-1">
            {project!.members.map((member) => (
              <li key={member.id} className="flex items-center justify-between">
                <Link href={`/profile/${member.id}`}>{member.name}</Link>
                <span className="flex gap-0.5 text-sm text-muted-foreground">
                  {member.tech}
                  <span>·</span>
                  {member.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Tech Stack</div>
          <div className="flex w-full flex-row items-center justify-center">
            <AnimatedTooltip items={project!.techStack} className="size-9" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Created at <time dateTime="2023-11-23">{project!.createdAt}</time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectDetails;