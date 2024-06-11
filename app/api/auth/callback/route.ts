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
      
      const response = NextResponse.redirect(`${origin}`);
      response.cookies.set(name, value, {
        httpOnly: true,
        path: '/create-project',
        // No maxAge, so it expires when the session ends (user logs out)
      });
      
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/`);
}
