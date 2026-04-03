import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isDashboard = pathname.startsWith("/dashboard");
  const isSeller = pathname.startsWith("/seller");

  // 🔒 Not logged in → redirect to login
  if ((isDashboard || isSeller) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 Admin only routes
  if (isDashboard && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔐 Seller only routes
  if (isSeller && role !== "SELLER") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/seller/:path*"],
};