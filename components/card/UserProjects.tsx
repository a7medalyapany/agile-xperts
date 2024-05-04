import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProjectsProps {}

const UserProjects: FC<UserProjectsProps> = () => {
  return (
    <Card className="flex flex-col gap-4 pt-1.5 drop-shadow-md">
      <CardHeader className="py-0">
        <CardTitle className="text-balance leading-relaxed">Projects</CardTitle>
      </CardHeader>
      <CardContent>User Projects</CardContent>
    </Card>
  );
};

export default UserProjects;
