// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  const pathname = req.nextUrl.pathname;

  // Skip public and static routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  if(!session){
    return NextResponse.redirect(new URL("/login", req.url));
  }

    const role = session.user.role!;
    const portal = req.cookies.get("portal")?.value;

    const validRoles = [
      "internshipStudent",
      "internshipCoordinator",
      "internshipAdmin",
      "scholarshipStudent",
      "scholarshipCoorinator",
      "scholarshipAdmin",
    ];

    if (!validRoles.includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Optional: Block users with mismatched portal
    if (
      (role.startsWith("internship") && portal !== "internship") ||
      (role.startsWith("scholarship") && portal !== "scholarship")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
