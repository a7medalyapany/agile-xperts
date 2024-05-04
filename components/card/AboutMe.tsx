import { FC } from "react";
import ReadMore from "../shared/ReadMore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutMeProps {}
const aboutMe =
  "I'm a dedicated Computer Science student with a strong passion for developing innovative software solutions and a keen interest in mastering the latest tech trends. Currently based In Egypt, I bring a unique blend of cultural perspectives and technical expertise to tackle complex problems. My academic and personal projects reflect my commitment to learning and applying practical skills in real-world scenarios, from coding robust applications to diving deep into data structures and algorithms. Eager to contribute to and grow within a dynamic team, I aim to leverage my skills to become a super professional software engineer.";

const AboutMe: FC<AboutMeProps> = () => {
  return (
    <Card className="flex flex-col gap-4 pt-1.5 drop-shadow-md">
      <CardHeader className="py-0">
        <CardTitle className="text-balance leading-relaxed">About me</CardTitle>
      </CardHeader>
      <CardContent>
        <ReadMore text={aboutMe} maxLength={300} />
      </CardContent>
    </Card>
  );
};

export default AboutMe;
