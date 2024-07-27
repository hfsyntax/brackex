import { NextRequest, NextResponse } from "next/server"
import { updateSession, getSession } from "./lib/session"

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|static-assets|img|profile_pictures|http|https).*)",
}

export async function middleware(request: NextRequest) {
  console.log(`path is ${request.nextUrl.pathname}`)
  const response = await updateSession(request)
  const session = await getSession()
  if (session && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } else if (
    !session &&
    ["/profile", "/dashboard/tournaments", "/dashboard/communities"].includes(
      request.nextUrl.pathname,
    )
  ) {
    return NextResponse.json({ error: "401 - Unauthorized" }, { status: 401 })
  } else {
    return response
  }
}
