import { createClient } from "@/lib/supabase/server";

export async function getLobby() {
  const supabase = createClient<Database>();

  try {
    const { data: projects, error: projectsError } = await supabase
      .from("project_technology_request_view")
      .select("*");

    if (projectsError) {
      throw new Error("Error retrieving projects: " + projectsError.message);
    }

    const typedProjects = projects.map(project => ({
      ...project,
      technologies: project.technologies as 
        {
          id: number;
          name: string;
          designation: string;
        }[]
    }));

    return typedProjects;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}
