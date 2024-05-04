import { FC } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface MostUsedLanguageProps {}

const MostUsedLanguage: FC<MostUsedLanguageProps> = () => {
  const githubStatsImage =
    "https://github-readme-stats.vercel.app/api/top-langs/?username=a7medalyapany&layout=compact&theme=transparent&hide_border=true&hide_title=true&langs_count=6";

  return (
    <Card className="flex flex-col pt-1.5 drop-shadow-md">
      <CardHeader className="py-0">
        <CardTitle className="text-balance leading-relaxed">
          Most Used Languages
        </CardTitle>
      </CardHeader>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={githubStatsImage} alt="Github stats" />
    </Card>
  );
};

export default MostUsedLanguage;
