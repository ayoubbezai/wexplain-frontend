// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Skip checks for public pages
  if (["/login", "/signup", "/unauthorized"].includes(pathname)) {
    return NextResponse.next();
  }

  // Call backend to get current user
  const laravelRes = await fetch(`http://localhost:8000/api/v1/me`, {
    headers: {
      accept: "application/json",
      cookie: req.headers.get("cookie") || "",
    },
  });

  // Not authenticated → redirect to login
  if (!laravelRes.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const data = await laravelRes.json();
  const user = data.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Only super_admin is authorized
  if (user.role !== "super_admin") {
    if (pathname !== "/unauthorized") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/unauthorized", "/overview"],
};
