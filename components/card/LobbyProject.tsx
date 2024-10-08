import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import SelectTech from "../form/SelectTech";
import { formatDate, formatNumber } from "@/lib/utils";

interface LobbyProjectProps {
  projectId: number;
  imageUrl: string;
  title: string;
  techStack: {
    id: number;
    name: string;
    designation: string;
  }[];
  knockCount: number;
  createdAt: string;
}

const LobbyProject: FC<LobbyProjectProps> = ({
  title,
  imageUrl,
  techStack,
  knockCount,
  createdAt,
  projectId,
}) => {
  return (
    <Card className="bg-gradient-to-t from-card to-muted">
      <CardHeader className="space-y-4 text-start">
        <Image
          alt="post"
          className="h-auto w-full rounded-lg"
          width="250"
          height="150"
          src={imageUrl || "/assets/images/project-placeholder.webp"}
          style={{
            aspectRatio: "250/150",
            objectFit: "cover",
          }}
        />
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="mr-2 flex grow items-center">
          {techStack && (
            <AnimatedTooltip items={techStack} className="size-9" />
          )}
        </div>
        <SelectTech technologies={techStack} projectId={projectId} />
      </CardContent>

      <CardFooter className="flex flex-wrap items-start justify-between gap-1.5 rounded-b-lg border-t bg-muted/50 px-6 py-3">
        <p className="grow text-start text-xs text-muted-foreground sm:grow-0">
          <span className="pr-1 font-bold text-primary">
            {formatNumber(knockCount)}
          </span>
          knocks on this project
        </p>
        <p className="text-xs text-muted-foreground">
          <time dateTime={createdAt}>
            {formatDate({ dateString: createdAt })}
          </time>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LobbyProject;
