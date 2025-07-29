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

  return (
    <main className="from-background via-background/95 to-accent/20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-1/2 -left-1/2 h-full w-full animate-pulse rounded-full blur-3xl"></div>
        <div className="bg-accent/10 absolute -right-1/2 -bottom-1/2 h-full w-full animate-pulse rounded-full blur-3xl delay-1000"></div>
      </div>
      {children}
    </main>
  );
};

export default Layout;
