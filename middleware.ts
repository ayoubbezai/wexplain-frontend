// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { navItems } from "@/config/navItem";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // ✅ Skip checks for login, unauthorized, and not-subscribed pages
  if (
    ["/login", "/unauthorized", "/not-subscribed", "signup"].includes(pathname)
  ) {
    return NextResponse.next();
  }

  // 🔑 Call Laravel /v1/me with cookies
  const laravelRes = await fetch(`http://localhost:8000/api/v1/me`, {
    headers: {
      accept: "application/json",
      cookie: req.headers.get("cookie") || "",
    },
  });

  // ❌ Not authenticated → go to login
  if (!laravelRes.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const data = await laravelRes.json();
  const user = data.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ❌ If user is not subscribed → redirect to /not-subscribed
  if (!user.subscription?.isSubscribed) {
    if (pathname !== "/not-subscribed") {
      return NextResponse.redirect(new URL("/not-subscribed", req.url));
    }
    return NextResponse.next();
  }

  // 🔎 Match route in navItems
  const matchedNavItem = navItems.find((item) => item.href === pathname);

  if (!matchedNavItem) {
    // page not listed → let through
    return NextResponse.next();
  }

  // ✅ Check role + plan
  const roleMatch = matchedNavItem.roles.includes(user.role);
  const planMatch =
    matchedNavItem.plans.length === 0 ||
    matchedNavItem.plans.includes(user.subscription?.current_best_plan || "");

  if (!roleMatch || !planMatch) {
    if (pathname !== "/unauthorized") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/overview",
    "/dentist/patients-list",
    "/appointments",
    "/payments",
    "/profile",
    "/inventory",
    "/laboratories",
    "/medicines",
    "/subscription",
    "/services",
    "/analytics",
    "/reports",
    "/tasks",
    "/documents",
    "/staff",
    "/audit-logs",
    "/not-subscribed",
    "/unauthorized",
  ],
};
