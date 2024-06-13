import { FC } from "react";
import LobbyProject from "@/components/card/LobbyProject";
import { techStack } from "@/constants/dummy";
import { getLobby } from "@/lib/actions/lobby.action";

interface pageProps {}

const Page: FC<pageProps> = async () => {
  const projects = await getLobby();
  console.log(projects[0].technologies);
  return (
    <>
      <header className="flex py-4">
        <h1 className="line-clamp-2 text-2xl font-bold sm:text-3xl">
          Find Your Perfect Project Match
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <LobbyProject
            key={project.project_id}
            title={project.project_title!}
            imageUrl={project.project_img_url!}
            techStack={
              techStack
              // project.technologies as { name: string; designation: string }[]
            }
            knockCount={project.request_count!}
            createdAt={project.project_created_at!}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
