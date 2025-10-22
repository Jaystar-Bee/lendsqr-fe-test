import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GLOBAL_NAME_E } from "./types/extra-enums";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const token = request.cookies.get(GLOBAL_NAME_E.AUTHTOKEN)?.value;

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if( token && url.pathname === "/") {
   return NextResponse.redirect(new URL("/dashboard/users", request.url));
  }

  return NextResponse.next();
}
