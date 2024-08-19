import LobbyProject from "@/components/card/LobbyProject";
import { FC } from "react";

interface ProjectResultsProps {}

const tachStack = [
  { id: 31, name: "TypeScript", designation: "backend" },
  { id: 32, name: "Nest.js", designation: "backend" },
  { id: 33, name: "React", designation: "frontend" },
];
const ProjectResults: FC<ProjectResultsProps> = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {[1, 2, 3, 4].map((result, index) => (
        <LobbyProject
          key={index}
          projectId={10}
          imageUrl={""}
          title={""}
          techStack={tachStack}
          knockCount={0}
          createdAt={"2024-06-16 11:19:01.612842+00"}
        />
      ))}
    </div>
  );
};

export default ProjectResults;
