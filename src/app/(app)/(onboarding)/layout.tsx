import { PageRoutes } from "@/constants/page-routes";
import { checkStudentOnBoarded } from "@/lib/api/auth/mutation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(PageRoutes.LOGIN);
  } else {
    const response = await checkStudentOnBoarded({
      id: session.user.id,
    });
    if (response) redirect(PageRoutes.DASHBOARD);
  }

  return <main>{children}</main>;
};

export default Layout;
