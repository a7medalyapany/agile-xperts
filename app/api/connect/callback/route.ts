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
      const name = 'provider_token';
      const value = data.session.provider_token;
      const oneYearInSeconds = 60 * 60 * 24 * 365;
      
      const response = NextResponse.redirect(`${origin}/settings/github`);
      response.cookies.set(name, value, {
        httpOnly: true,
        path: '/create-project',
        maxAge: oneYearInSeconds,
      });
      
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/settings/github`);
}