'use server';

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { z } from "zod";
import { SignInValidation, SignUpValidation } from "../validation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { extractNameFromEmail } from "../utils";

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
	  return redirect(`/login?message=${encodeURIComponent('Invalid credentials. Please try again.')}`);
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
          avatar_url: `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`
        },
        emailRedirectTo: `${origin}/api/auth/callback`
      },
    });

    if (error?.message) {
      return redirect(`/register?message=${encodeURIComponent(error.message)}`);
    }

    return redirect(`/login?message=${encodeURIComponent('Check your email to complete the sign-up process.')}`)
};


export const signInWithGithub = async () => {
	const supabase = createClient();
	const origin = headers().get("origin");
  
	const { error, data } = await supabase.auth.signInWithOAuth({
	  provider: "github",
	  options: { 
			scopes: "repo delete_repo",
			redirectTo: `${origin}/api/auth/callback` 
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
    const origin = process.env.NEXT_PUBLIC_BASE_URL

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
    redirect(data.url)
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
