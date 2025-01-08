import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Ambil token dari cookie
  const token = request.cookies.get("next-auth.token")?.value;
  const path = request.nextUrl.pathname;

  const protectedPaths = ["/profile"];
  const publicPaths = ["/login", "/register"];

  // Debug logging
  console.log("Middleware - Path:", path);
  console.log("Middleware - Token:", !!token);

  // Jika mencoba mengakses halaman yang dilindungi tanpa token
  if (protectedPaths.includes(path) && !token) {
    console.log("Redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah login dan mencoba mengakses halaman login/register
  if (token && publicPaths.includes(path)) {
    console.log("Redirecting to profile");
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login", "/register"],
};
