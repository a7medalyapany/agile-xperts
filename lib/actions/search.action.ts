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

export async function searchProjects(query: string | null, techFilter: string[] | null) {
  const supabase = createClient<Database>();
  
  try {
    // Define a default value for techFilter if it's not provided
    const techFilterValue: string[] = techFilter || null;

    // Call the Supabase RPC function with appropriate parameters
    const { data, error } = await supabase
    .rpc('search_projects', { query: query || '', tech_filter: techFilterValue.length > 0 ? techFilterValue : null });

    // Check for errors
    if (error) {
    throw error;
    }

    // Log data if necessary
    console.log('Projects:', data);
    return data;
  } catch (error: any) {
    console.error('Error fetching projects:', error.message);
    return null;
  }
}
  