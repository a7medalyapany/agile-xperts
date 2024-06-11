import { createClient } from "@/lib/supabase/server";
import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

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

  return response;
}

export const config = {
  matcher: [
    '/profile',
    // '/create-project',
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
