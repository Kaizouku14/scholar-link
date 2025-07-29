import { PageRoutes } from "@/constants/page-routes";
import { checkStudentOnBoarded } from "@/lib/api/auth/mutation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(PageRoutes.LOGIN);
  }

  const { id } = session.user;

  const isOnboarded = await checkStudentOnBoarded({ id });
  if (!isOnboarded) redirect(PageRoutes.SETUP);

  return <main>{children}</main>;
};

export default Layout;
