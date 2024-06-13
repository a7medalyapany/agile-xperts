import { createClient } from "@/lib/supabase/server";

export async function getLobby() {
  const supabase = createClient<Database>();

  try {
    // Get projects
    const { data: projects, error: projectsError } = await supabase
      .from("project_technology_request_view")
      .select("*");

    if (projectsError) {
      throw new Error("Error retrieving projects: " + projectsError.message);
    }

    // Format and log projects data with nested objects
    const formattedProjects = projects.map((project) => ({
      project_id: project.project_id,
      project_title: project.project_title,
      project_created_at: project.project_created_at,
      project_img_url: project.project_img_url,
      request_count: project.request_count,
      technologies: project.technologies, // Ensure technologies are formatted as needed
    }));

    // Properly print the projects with nested objects
    // console.log(JSON.stringify(formattedProjects, null, 2));
    // console.log(formattedProjects);
    return formattedProjects;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}
