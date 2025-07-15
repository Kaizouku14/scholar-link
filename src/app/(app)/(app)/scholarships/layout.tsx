import { PageRoutes } from "@/constants/page-routes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const { role } = session.user;

    if (role?.startsWith("internship")) {
      redirect(PageRoutes.DASHBOARD);
    }
  }

  return <main>{children}</main>;
};

export default Layout;
