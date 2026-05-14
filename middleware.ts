import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  // chưa login mà vào trang protected
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // đã login mà vào login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  console.log("token:", token);
  return NextResponse.next();
}
export const config = {
  matcher: [
    // "/home",
    // "/home/:path*",
    // "/selection",
    // "/selection/:path*",
    // "/map",
    // "/map/:path*",
    // "/service",
    // "/service/:path*",
  ],
};
