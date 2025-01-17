import updateSession from "@/lib/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

const middleware = async (request: NextRequest) => {
  const url = request.nextUrl.clone();

  // if (url.pathname === "/") {
  //   url.pathname = "/splash";
  //   return NextResponse.rewrite(url);
  // }

  return NextResponse.next();
  return await updateSession(request);
};

export const config = {
  matcher: [
    "/",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export default middleware;
