import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SideBar } from "@/components/sidebar/sidebar";
import { type PropsWithChildren } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";
import { checkStudentOnBoarded } from "@/lib/api/auth/mutation";
import { PageBreadCrumb } from "@/components/breadcrumbs/page-header";

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
      <SidebarInset className="flex">
        <header className="flex h-16 w-fit shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <PageBreadCrumb />
          </div>
        </header>
        <div className="container flex flex-row overflow-y-auto px-2">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
