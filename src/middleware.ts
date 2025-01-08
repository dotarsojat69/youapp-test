import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    response.headers.set("Access-Control-Max-Age", "1728000");
    return response;
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
