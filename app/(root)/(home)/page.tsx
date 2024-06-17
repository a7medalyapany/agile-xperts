import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Streaks from "@/components/card/Streaks";
import CreateProject from "@/components/card/CreateProject";
import ProjectDetails from "@/components/card/ProjectDetails";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/actions/user.action";

import { columns } from "./table-components/column";
import { DataTable } from "./table-components/data-table";
import {
  getLatestProject,
  getCurrentUserProjects,
} from "@/lib/actions/project.action";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const supabase = createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return redirect("/login");
  }

  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }

  const { project, owner, members, stack } = await getLatestProject();
  const myProjects = await getCurrentUserProjects();
  console.log(myProjects);

  return (
    <main className="grid flex-1 items-start gap-4 lg:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <CreateProject userRole={user.user_role!} />
          <Streaks
            userRole={user.user_role!}
            strakPoints={user.streak_points!}
          />
        </div>

        <section className="hidden space-y-2 sm:block">
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Projects</CardTitle>
              <CardDescription>Recent projects you worked on.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={myProjects || []} columns={columns} />
            </CardContent>
          </Card>
        </section>
      </div>
      {Object.keys(project).length !== 0 && (
        <ProjectDetails
          openProject={true}
          projectId={project.project_id}
          title={project.project_title}
          description={project.project_description}
          githubUrl={project.github_repo_url}
          createdAt={project.project_created_at}
          members={members}
          stack={stack}
          owner={owner}
        />
      )}
    </main>
  );
};
export default Page;
