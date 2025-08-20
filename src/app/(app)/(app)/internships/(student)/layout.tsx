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

  if (session?.user.role !== ROLE.INTERNSHIP_STUDENT) {
    redirect(PageRoutes.DASHBOARD);
  }

  return <main className="mx-auto w-full">{children}</main>;
};

export default Layout;
