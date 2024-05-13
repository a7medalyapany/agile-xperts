import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.error();
    }

    if (data.session && data.session.provider_token) {

		// TODO
		// 1- encrypt token
		// 2- push in database
		// 3- set in cookies
      
		//   const name = 'provider_token';
		//   const value = data.session.provider_token;
		//   console.log("Setting cookie:", name, value);
		
		
		//   const response = NextResponse.redirect(`${origin}/settings/github`);
		//   response.cookies.set({ name, value});

     	// return response;
    }
  }

  return NextResponse.redirect(`${origin}/settings/github`);
}
