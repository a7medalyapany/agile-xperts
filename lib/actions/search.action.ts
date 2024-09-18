'use server';
import { createClient } from "@/lib/supabase/server";

export async function searchUsers(query: string) {
  const supabase = createClient();
  try {
    const { data: users, error } = await supabase
      .from("public_profile_view")
      .select('*')
      .textSearch('name, username, email', query, { config: 'english', type: 'websearch' });

    if (error) throw new Error(error.message);
    return users || [];
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}

export async function searchPosts(query: string) {
  const supabase = createClient();
  try {
    const { data: posts, error } = await supabase
      .from("post_details")
      .select('*')
      .textSearch('content', query, { config: 'english', type: 'websearch' })
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return posts || [];
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}

export async function searchProjects(query: string |  null, techFilter: string[] | null) {
  const supabase = createClient<Database>(); 
  const params = {
    query: query || undefined,
    tech_filter: techFilter || undefined,
  };
  try {
    const { data, error } = await supabase.rpc('search_projects', params);

    if (error) {
      console.error('Error searching tech stack:', error);
      return [];
    }

    return data;

  } catch (error) {
    console.error('Error searching tech stack:', error);
    return null;
  }
}
