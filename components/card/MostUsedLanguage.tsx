import { FC } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface MostUsedLanguageProps {
  githubUsername?: string;
}

const MostUsedLanguage: FC<MostUsedLanguageProps> = ({ githubUsername }) => {
  if (!githubUsername) return null;

  const githubStatsImage = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=transparent&hide_border=true&hide_title=true&langs_count=6`;

  return (
    <Card className="flex grow flex-col pt-1.5 drop-shadow-md">
      <CardHeader className="py-0">
        <CardTitle className="text-balance leading-relaxed">
          Most Used Languages
        </CardTitle>
      </CardHeader>
      <Image
        src={githubStatsImage}
        width={400}
        height={400}
        unoptimized={true}
        alt="Github stats"
        className="size-fit"
      />
    </Card>
  );
};

export default MostUsedLanguage;
