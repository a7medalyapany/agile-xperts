import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { checkUserIdentity, getUserRoleById } from "./lib/actions/user.action";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  if (request.nextUrl.pathname === '/profile') {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Error fetching user:", error.message);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!user) {
      console.error("User not authenticated");
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const currentUserId = user.id;

    return NextResponse.redirect(new URL(`/profile/${currentUserId}`, request.url));
  }


  if (request.nextUrl.pathname === '/create-project') {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!user) {
      console.error("User not authenticated");
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const providerToken = cookies().get('provider_token');

    if (!providerToken) {
      console.error("No provider_token found in cookies");
      return NextResponse.redirect(new URL(`/settings/github?message=${encodeURIComponent(`Please provide a token with repo permissions to proceed. Without it, some features won't work.`)}`, request.url));
    }

    const { role } = await getUserRoleById(user.id);
    
    if (role !== 'pro') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname === '/settings/security') {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Error fetching user:", error.message);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!user) {
      console.error("User not authenticated");
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { identitiesNumber, hasGitHubIdentity } = await checkUserIdentity();

    console.log(identitiesNumber, hasGitHubIdentity);

    if (hasGitHubIdentity && identitiesNumber === 1) {
      return NextResponse.redirect(new URL('/settings/security/github', request.url));
    }
    return NextResponse.next();
  }

  return response;
}

export const config = {
  matcher: [
    '/profile',
    '/bookmarks',
    '/settings', // make sure to add the settings pages *
    '/create-project',
    '/settings/security',
    '/settings/security/github',
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
