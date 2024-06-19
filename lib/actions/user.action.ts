"use server";

import { createClient } from "@/lib/supabase/server";
import { joinRequestParams } from "../types";

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
      throw new Error("Error fetching user: " + error.message);
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

      console.log(insertRequestError);

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

export async function insertComment(
  postId: number,
  content: string,
  imgUrl: string
) {
  try {
    const supabase = createClient<Database>();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      throw new Error("Error fetching user: " + error.message);
    }
    const userId = user?.id;
    const { data } = await supabase.from("reply").insert([
      {
        user_id: userId,
        post_id: postId,
        content: content,
        img_url: imgUrl,
      },
    ]);

    if (error) {
      throw error;
    }

    console.log("Comment inserted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error inserting comment:", error);
    throw error;
  }
}

export const getUserRelatedNotifications = async () => {
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
    const { data } = await supabase
      .from("user_notifications_view")
      .select("*")
      .eq("related_user_id", userId);

    if (error) {
      throw new Error("Error retrieving notifications: " + error);
    }

    console.log(data); // Logging fetched data for debugging

    return data ?? []; // Ensure data is returned (or empty array if null)
  } catch (error) {
    throw new Error("Error fetching user-related notifications: " + error);
  }
};
