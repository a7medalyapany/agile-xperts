'use server';

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { z } from "zod";
import { SignInValidation, SignUpValidation } from "../validation";
import { headers } from "next/headers";

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
	console.log(username)
	
    const origin = headers().get("origin");
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/api/auth/callback`,
      },
    });

    if (error) {
      return redirect(`/login?message=${encodeURIComponent('Unable to sign up. Please try again later.')}`);
    }

    return redirect(`/login?message=${encodeURIComponent('Check your email to complete the sign-up process.')}`)
};


export const signInWithGithub = async () => {
	const supabase = createClient();
	const origin = headers().get("origin");
  
	const { error, data } = await supabase.auth.signInWithOAuth({
	  provider: "github",
	  options: { 
			scopes: "repo",
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