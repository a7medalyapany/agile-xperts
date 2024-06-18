import { FC } from "react";
import { URLProps } from "@/types";
import { redirect } from "next/navigation";
import ProjectDetails from "@/components/card/ProjectDetails";
import {
  getProjectById,
  getProjectRequests,
} from "@/lib/actions/project.action";
import { createClient } from "@/lib/supabase/server";

interface pageProps extends URLProps {}

const Page: FC<pageProps> = async ({ params }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { project, owner, members, stack } = await getProjectById(
    parseInt(params.id)
  );

  const data = await getProjectRequests(parseInt(params.id));

  if (Object.keys(project).length === 0 || !user) {
    redirect("/404?error=project_not_found");
    return <div>Project not found</div>;
  }

  return (
    <div className="text-center">
      <ProjectDetails
        currentUserId={user.id}
        projectId={project.project_id}
        title={project.project_title}
        description={project.project_description}
        githubUrl={project.github_repo_url}
        createdAt={project.project_created_at}
        members={members}
        stack={stack}
        owner={owner}
        projectRequests={data}
      />
    </div>
  );
};

export default Page;
