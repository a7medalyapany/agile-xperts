import { FC } from "react";
import { URLProps } from "@/types";
import ProjectDetails from "@/components/card/ProjectDetails";
import { getProjectById } from "@/lib/actions/project.action";

interface pageProps extends URLProps {}

const Page: FC<pageProps> = async ({ params }) => {
  const { project, owner, members, stack } = await getProjectById(
    parseInt(params.id)
  );

  return (
    <div className="text-center">
      <ProjectDetails
        projectId={project.project_id}
        title={project.project_title}
        description={project.project_description}
        githubUrl={project.github_repo_url}
        createdAt={project.project_created_at}
        members={members}
        stack={stack}
        owner={owner}
      />
    </div>
  );
};

export default Page;
