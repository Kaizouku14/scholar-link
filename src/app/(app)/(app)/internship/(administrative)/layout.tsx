import { PageRoutes } from "@/constants/page-routes";
import { ROLE } from "@/constants/users/roles";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(PageRoutes.DASHBOARD);
  }

  // Allowed roles
  const allowedRoles = [
    ROLE.INTERNSHIP_ADMIN,
    ROLE.INTERNSHIP_COORDINATOR,
  ] as string[];

  if (!allowedRoles.includes(session.user.role!)) {
    redirect(PageRoutes.DASHBOARD);
  }

  return <main className="mx-auto w-full">{children}</main>;
};

export default Layout;
