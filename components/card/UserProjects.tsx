import { FC } from "react";
import { getUserProjectsById } from "@/lib/actions/project.action";
import { columns } from "@/app/(root)/profile/table-components/column";
import { DataTable } from "@/app/(root)/(home)/table-components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProjectsProps {
  userId: string;
}

const UserProjects: FC<UserProjectsProps> = async ({ userId }) => {
  const myProjects = await getUserProjectsById(userId);

  return (
    <Card className="flex flex-col gap-4 pt-1.5 drop-shadow-md">
      <CardHeader className="py-0">
        <CardTitle className="text-balance leading-relaxed">Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={myProjects || []} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default UserProjects;
