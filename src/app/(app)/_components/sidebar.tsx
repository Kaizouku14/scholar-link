"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import NavHeader from "./nav-header";
import { NavUser } from "./nav-user";
import ModeToggle from "@/components/theme/mode-toggler";
import type { roleType, UserInfo } from "@/constants/roles";
import { authClient } from "@/lib/auth-client";

export const SideBar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role as roleType;
  const user = session?.user as UserInfo;

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
        <SidebarSeparator className="mx-auto" />
      </SidebarHeader>
      ``
      <SidebarContent className="px-1.5">
        <NavMain userRole={role} />
        <ModeToggle />
      </SidebarContent>
      <SidebarSeparator className="mx-auto" />
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
