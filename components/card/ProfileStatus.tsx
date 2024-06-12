import { FC } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface ProfileStatusProps {
  githubUsername?: string;
  strakPoints: number;
  level: number;
}

const ProfileStatus: FC<ProfileStatusProps> = ({
  level,
  strakPoints,
  githubUsername,
}) => {
  const stats = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&hide_title=true&hide_border=true&theme=transparent&show=reviews,discussions_started,prs_merged,prs_merged_percentage&hide=issues,discussions_started&show_icons=true`;

  return (
    <Card className="grow drop-shadow-md">
      <CardHeader className="py-3 pl-4">
        <div className="w-fit rounded-lg bg-primary px-4">
          <p className="text-sm font-bold text-primary-foreground">Pro</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2 pb-2 pl-4">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground ">
          <p className="flex gap-1">
            Level:
            <span className="text-foreground">{level}</span>
          </p>
          <span className="text-foreground">·</span>
          <p className="flex gap-1">
            Streak Points:
            <span className="text-foreground">{strakPoints}</span>
          </p>
        </div>
        <Progress
          className="h-1 rounded-sm"
          value={30}
          aria-label="30% increase"
        />
      </CardContent>
      {githubUsername && (
        <Image
          src={stats}
          width={400}
          height={400}
          unoptimized={true}
          alt="Github Stats"
          className="size-fit"
        />
      )}
    </Card>
  );
};

export default ProfileStatus;
