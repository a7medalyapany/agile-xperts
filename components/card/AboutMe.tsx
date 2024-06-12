import { FC } from "react";
import ReadMore from "../shared/ReadMore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutMeProps {
  aboutMe: string;
}

const AboutMe: FC<AboutMeProps> = ({ aboutMe }) => {
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
