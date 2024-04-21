import { FC } from "react";
import { ArrowUpRight, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { currentProjectMembers, techStack } from "@/constants/dummy";

interface CurrentProjectProps {}

const CurrentProject: FC<CurrentProjectProps> = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Project Name
          </CardTitle>
          <CardDescription className="text-start text-sm text-muted-foreground">
            @owner
          </CardDescription>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Open
            </span>
            <ArrowUpRight className="size-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="size-8">
                <MoreVertical className="size-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
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
            <p className="line-clamp-5 text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              sequi consectetur adipisci asperiores impedit ducimus, ea, velit
              voluptas, dicta assumenda eius veniam alias rerum. Ut quasi
              suscipit quos autem voluptates sed dolor quo, aliquid facere
              eveniet quae sit mollitia quia incidunt aspernatur quibusdam quis
              molestias perspiciatis. Ut natus neque ratione.
            </p>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Members</div>
          <ul className="grid gap-1">
            {currentProjectMembers.map((member) => (
              <li key={member.id} className="flex items-center justify-between">
                <span className="text-muted-foreground">{member.name}</span>
                <span>{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Tech Stack</div>
          <div className="flex w-full flex-row items-center justify-center">
            <AnimatedTooltip items={techStack} className="size-9" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CurrentProject;
