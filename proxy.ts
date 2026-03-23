import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Admin only
  if (pathname.startsWith("/dashboard")) {
    if (req.auth?.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Seller only
  if (pathname.startsWith("/seller")) {
    if (req.auth?.user.role !== "SELLER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/seller/:path*"],
};