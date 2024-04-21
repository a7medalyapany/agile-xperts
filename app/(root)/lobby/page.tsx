import { FC } from "react";
import LobbyProject from "@/components/card/LobbyProject";
import { techStack, projects } from "@/constants/dummy";

interface pageProps {}

const Page: FC<pageProps> = () => {
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
            key={project.id}
            title={project.title}
            imageUrl={project.imageUrl!}
            techStack={techStack}
            knockCount={project.knockCount}
            createdAt={project.createdAt}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
