"use server";

import { z } from 'zod';
import { joinRequestParams } from "../types";
import { accountFormSchema, profileFormSchema } from '../validation';

import { revalidatePath } from 'next/cache';
import { createClient } from "@/lib/supabase/server";

type AccountFormValues = z.infer<typeof accountFormSchema>
type ProfileFormValues = z.infer<typeof profileFormSchema>;
type UpdateData = Partial<Omit<ProfileFormValues, 'country'>> & {
  avatar_url?: string;
  location?: number;
  country?: { id: number };
};

export const checkUserIdentity = async () => {
  const supabase = createClient();
  const {
    data: { identities },
  }: any = await supabase.auth.getUserIdentities();

  const GitHubIdentity = identities.find(
    (identity: { provider: string }) => identity.provider === "github"
  );
  const githubUsername: string = GitHubIdentity?.identity_data.user_name;
  const hasGitHubIdentity = !!GitHubIdentity;
  const identitiesNumber: number = identities.length;

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
    const { data: privateProfileView, error } = await supabase
      .from("private_profile_view")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      throw new Error("Error retrieving user profile: " + error.message);
    }

    if (!privateProfileView) {
      throw new Error("User not found");
    }

    return (privateProfileView ?? []) as privateProfileView;
  } catch (error) {
    throw new Error("Error fetching user profile: " + error);
  }
}

export async function getUserById(userId: string) {
  const supabase = createClient<Database>();

  try {
    const { data: publicProfileView, error } = await supabase
      .from("public_profile_view")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error("Error retrieving user profile: " + error.message);
    }

    if (!publicProfileView) {
      throw new Error("User not found");
    }

    return publicProfileView as publicProfileView;
  } catch (error) {
    throw new Error("Error fetching user profile: " + error);
  }
}

export async function getUserSocialMedia(userId: string) {
  const supabase = createClient<Database>();

  try {
    const { data: socialMedia, error } = await supabase
      .from("social_media")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error(
        "Error retrieving social media accounts: " + error.message
      );
    }

    if (!socialMedia) {
      throw new Error("social media accounts not found");
    }

    return socialMedia;
  } catch (error) {
    throw new Error("Error fetching user social media links: " + error);
  }
}

export async function joinRequest(params: joinRequestParams) {
  const supabase = createClient<Database>();
  const { projectId, technologyId } = params;
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      throw new Error("you need to be logged in to perform this action. ");
    }
    const userId = user?.id;
    const { data } = await supabase
      .from("team")
      .select("id")
      .eq("project_id", projectId)
      .single();
    const teamId = data?.id;

    if (userId && teamId) {
      const { error: insertRequestError } = await supabase
        .from("request")
        .insert([
          {
            user_id: userId,
            team_id: teamId,
            tech_id: technologyId,
          },
        ]);


      if (insertRequestError) {
        throw new Error(
          "Error inserting request: " + insertRequestError.message
        );
      }
    }
  } catch (error) {
    throw new Error("Error fetching user: " + error);
  }
}

export const getUserNotifications = async () => {
  const supabase = createClient<Database>();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      throw new Error("Error fetching user: " + error.message);
    }
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const { data } = await supabase
      .from("user_notifications_view")
      .select("*")
      .eq("related_user_id", userId)
      .neq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error("Error retrieving notifications: " + error);
    }


    return data ?? [];
  } catch (error) {
    throw new Error("Error fetching user-related notifications: " + error);
  }
};

export async function fetchRecentUsers(numUsers: number) {
  const supabase = createClient<Database>();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      throw new Error("Error fetching user: " + userError);
    }
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }
    const { data, error } = await supabase.rpc("get_recent_users", {
      num_users: numUsers,
      p_user_id: userId,
    });

    if (error) {
      throw new Error(`Error fetching recent users: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return null;
  }
}


export async function getUsersInSameTeam() {
  const supabase = createClient<Database>();
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error("Error fetching user: " + error);
    }
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const { data, error: rpcError } = await supabase.rpc("get_users_in_same_team", {
      p_user_id: userId,
    });

    if (rpcError) {
      throw new Error("Error executing RPC: " + rpcError.message);
    }

    const numberOfRows = data?.length ?? 0;

    if (numberOfRows < 10) {
      const restOfUsers = await fetchRecentUsers(10 - numberOfRows);

      if (restOfUsers) {
        const map = new Map();
        // Add users from the first array
        data.forEach(user => map.set(user.user_id, user));
        // Add users from the second array (restOfUsers) and skip duplicates
        restOfUsers.forEach(user => map.set(user.user_id, user));
        
        // Convert the Map back to an array and filter out the current user
        const combinedUsers = Array.from(map.values()).filter(user => user.user_id !== userId);

        return combinedUsers;
      }
    }

    return data;
  } catch (error) {
    console.error("Error in getUsersInSameTeam:", error);
    return null;
  }
}


export async function getProfileFormData() {
  const supabase = createClient<Database>();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      throw new Error("Error fetching user: " + error);
    }
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const { data, error: profileError } = await supabase
      .from('profile')
      .select(`
        name, 
        username, 
        avatar_url, 
        bio, 
        countries(id, name)
      `)
      .eq('id', userId)
      .single();

    if (profileError) {
      throw new Error("Error fetching user profile: " + profileError.message);
    }

    return data;
  } catch (error) {
    console.error("Error in getUsersInSameTeam:", error);
    return null;
  }
}


export async function updateProfile(updates: Partial<UpdateData>) {
  const supabase = createClient<Database>();
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('User not found: ' + (userError?.message || 'Unknown error'))
  }

  const userUpdates: Partial<UpdateData> = {}

  if (updates.name !== undefined) userUpdates.name = updates.name
  if (updates.username !== undefined) userUpdates.username = updates.username
  if (updates.bio !== undefined) userUpdates.bio = updates.bio
  if (updates.avatar_url !== undefined) userUpdates.avatar_url = updates.avatar_url
  if (updates.country?.id !== undefined) userUpdates.location = updates.country.id


  // Only proceed with the update if there are changes
  if (Object.keys(userUpdates).length > 0) {
    const { error: profileError } = await supabase
      .from('profile')
      .update(userUpdates)
      .eq('id', user.id)

    if (profileError) {
      throw new Error('Error updating profile table: ' + profileError.message)
    }

    revalidatePath('/settings/profile')
    return { success: true, userUpdates }
  } else {
    return { success: false, message: 'No changes to update' }
  }
}

export async function getAccountFormData() {
  const supabase = createClient<Database>();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      throw new Error("Error fetching user: " + error);
    }
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const { data, error: profileError } = await supabase
      .from('profile')
      .select(`
        id,
        about_me, 
        skills
      `)
      .eq('id', userId)
      .single();

    if (profileError) {
      throw new Error("Error fetching user profile: " + profileError.message);
    }

    const { data: socialAccounts, error: socialError } = await supabase
    .from('social_media')
    .select('id, platform, account_link')
    .eq('user_id', userId);

    if (socialError) {
      throw new Error("Error fetching user social media accounts: " + socialError.message);
    }

    return { profile: data, socialAccounts };
  } catch (error) {
    console.error("Error in getUsersInSameTeam:", error);
    return null;
  }
}

export async function updateAccountForm(formData: AccountFormValues) {
  const supabase = createClient<Database>();

  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User not found: ' + (userError?.message || 'Unknown error'));
    }


    // Start a transaction to update the profile and social media
    const { data, error } = await supabase.rpc('update_profile_and_social_media', {
      p_user_id: user.id,
      p_about_me: formData.aboutMe ?? '',
      p_skills: formData.skills ?? [],
      p_social_media: (formData.urls ?? []).map(url => ({
        platform: url.platform,
        account_link: url.value,
      })),
    });

    if (error) {
      throw new Error('Error updating profile: ' + error.message);
    }

    // Return success response
    return { success: true, data };
  } catch (err) {
    console.error('An error occurred while updating the account:', err);

    // Return an error response with the message
    return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred' };
  }
}

