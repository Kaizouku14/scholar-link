import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "@/components/sidebar/sidebar";
import { type PropsWithChildren } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";
import { checkStudentOnBoarded } from "@/lib/api/auth/mutation";

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

  return (
    <SidebarProvider>
      <SideBar />
      <main className="border-border my-2 mr-2 min-h-screen w-full flex-1 rounded-lg p-4 px-2.5 shadow-sm md:border">
        <div className="flex flex-row">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
