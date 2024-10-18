import { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LobbyProject from "@/components/card/LobbyProject";
import { searchProjects } from "@/lib/actions/search.action";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectResultsProps {
  query: string;
}

const ProjectResults: FC<ProjectResultsProps> = ({ query }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Extract filters from searchParams, excluding "q" and "type" and flatten the values into a single array
  const filters = Array.from(searchParams.entries())
    .filter(([key]) => !["q", "type"].includes(key))
    .flatMap(([, value]) => value.split("-"));

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      // Pass the query and the flattened filters array to searchProjects
      const result = await searchProjects(query, filters);
      setProjects(result ?? []);
      setLoading(false);
    };

    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchParams]);

  if (loading)
    return (
      <div className="grid w-full flex-1 grid-cols-1 gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-4 rounded-lg border p-4">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-6 w-1/2" />
            <div className="flex items-center justify-between">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {projects?.map((project: any) => (
        <LobbyProject
          key={project.project_id!}
          projectId={project.project_id!}
          imageUrl={project.project_image_url}
          title={project.title}
          techStack={project.tech_stack}
          knockCount={project.knock_count}
          createdAt={project.created_at}
        />
      ))}
    </div>
  );
};

export default ProjectResults;
