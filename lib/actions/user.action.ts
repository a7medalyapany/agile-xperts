"use server";

import { createClient } from "@/lib/supabase/server";

export const checkUserIdentity = async () => {
  const supabase = createClient();
  const {
    data: { identities },
  }: any = await supabase.auth.getUserIdentities();

  const GitHubIdentity = identities.find(
    (identity: { provider: string }) => identity.provider === "github"
  );
  const githubUsername = GitHubIdentity?.identity_data.user_name;
  const hasGitHubIdentity = !!GitHubIdentity;
  const identitiesNumber = identities.length;

  return { identities, githubUsername, hasGitHubIdentity, identitiesNumber };
};

export async function getUserRoleById(userId: string) {
  const supabase = createClient<Database>();

  try {
    const { data, error } = await supabase
      .from("user_role")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (error) {
      throw new Error("Error retrieving user role: " + error.message);
    }

    // console.log(data);
    return data;
  } catch (error: any) {
    throw new Error("Error fetching user role: " + error.message);
  }
}

export async function getCurrentUser() {
  const supabase = createClient<Database>();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not logged in");
  }

  try {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      throw new Error("Error retrieving user profile: " + error.message);
    }
    const { role } = await getUserRoleById(data.id);
    const userDataWithRole = {
      ...data,
      role: role || "normal",
    };

    // console.log(userDataWithRole);
    return userDataWithRole as unknown as ProfileWithRole;
  } catch (error) {
    throw new Error("Error fetching user profile: " + error);
  }
}
