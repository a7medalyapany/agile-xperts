"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { z } from "zod";
import { SignInValidation, SignUpValidation } from "../validation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { extractNameFromEmail } from "../utils";
import { PasswordChangeParams } from "@/lib/types";
import { getCurrentUser } from "./user.action";

type loginValidation = z.infer<typeof SignInValidation>;
type signUpValidation = z.infer<typeof SignUpValidation>;

export const signIn = async (values: loginValidation) => {
  const { email, password } = values;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(
      `/login?message=${encodeURIComponent("Invalid credentials. Please try again.")}`
    );
  }

  return redirect("/");
};

export const signUp = async (values: signUpValidation) => {
  const { email, password, username } = values;

  const origin = headers().get("origin");
  const supabase = createClient();

  const name = extractNameFromEmail(email);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        username,
        email,
        avatar_url: `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`,
      },
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error?.message) {
    return redirect(`/register?message=${encodeURIComponent(error.message)}`);
  }

  return redirect(
    `/login?message=${encodeURIComponent("Check your email to complete the sign-up process.")}`
  );
};

export const signInWithGithub = async () => {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      scopes: "repo delete_repo",
      redirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
  } else {
    return redirect(data.url);
  }
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const linkGitHub = async (path: string) => {
  const supabaseServer = createClient();
  const origin = process.env.NEXT_PUBLIC_BASE_URL;

  const { data, error } = await supabaseServer.auth.linkIdentity({
    provider: "github",
    options: {
      scopes: "repo delete_repo",
      redirectTo: `${origin}/api/connect/callback`,
    },
  });

  if (error) {
    return console.log("error", error);
  }
  supabaseServer.auth.refreshSession();
  revalidatePath(path);
  redirect(data.url);
};

export const UnLinkGitHub = async (path: string) => {
  const supabase = createClient();
  const {
    data: { identities },
  }: any = await supabase.auth.getUserIdentities();

  const githubIdentity = identities.find(
    (identity: { provider: string }) => identity.provider === "github"
  );

  const { error } = await supabase.auth.unlinkIdentity(githubIdentity);

  if (error) {
    return console.log("error", error);
  }
  revalidatePath(path);
};

export async function resetPassword() {
  const supabase = createClient();
  const origin = process.env.NEXT_PUBLIC_BASE_URL;
  const { email } = await getCurrentUser();
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    email ?? "",
    {
      redirectTo: `${origin}/settings/security/github`,
    }
  );

  if (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
  return data;
}

export const exchangeCodeForSession = async (code: string) => {
  try {
    const supabase = createClient();

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      throw new Error(`Error exchanging code for session: ${error.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(`Error exchanging code for session: ${error}`);
  }
};

export const changePassword = async (params: PasswordChangeParams) => {
  const supabase = createClient();
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();
  // Update the user password
  if (getUserError) {
    throw new Error(
      "Error retrieving user: " + getUserError?.message || "Unknown error"
    );
  }

  if (!user) {
    throw new Error("error in changePassword");
  }
  const { data } = await supabase.auth.updateUser({
    password: params.newPassword,
  });

  if (data) {
    return redirect("/");
  }
};

export const changeEmailPassword = async (params: PasswordChangeParams) => {
  const supabase = createClient();

  // Get the current user
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "Error retrieving user: " + getUserError?.message || "Unknown error"
    );
  }
  // Re-authenticate the user with their old password
  const { email } = user;

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email ?? "",
    password: params.oldPassword || "", // Fix: Ensure params.oldPassword is not undefined
  });

  if (signInError) {
    throw new Error("Error old password is wrong " + signInError.message);
  }

  // Update the user password
  const { data } = await supabase.auth.updateUser({
    password: params.newPassword,
  });
  if (data) {
    return redirect("/");
  }
};


export async function checkUsernameUnique(username: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('public_profile_view')
    .select('username')
    .eq('username', username)
    .maybeSingle()
  

  if (error) {
    console.error('Error checking username:', error)
    return false
  }

  return data === null
}
