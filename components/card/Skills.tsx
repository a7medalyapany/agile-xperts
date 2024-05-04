import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { userSkills } from "@/constants/dummy";

interface SkillsProps {}

const Skills: FC<SkillsProps> = () => {
  return (
    <Card className="flex flex-col gap-4 pt-1.5 drop-shadow-md">
      <CardHeader className="py-0">
        <CardTitle className="text-balance leading-relaxed">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {userSkills.map((skill) => (
            <span
              key={skill.name}
              className="cursor-pointer rounded-md bg-muted p-1.5 text-sm text-muted-foreground"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;
