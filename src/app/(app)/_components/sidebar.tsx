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

interface SideBarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: roleType;
  user: UserInfo;
}

export const SideBar = ({ userRole, user, ...props }: SideBarProps) => {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
        <SidebarSeparator className="mx-auto" />
      </SidebarHeader>
      <SidebarContent className="px-1.5">
        <NavMain userRole={userRole} />
        <ModeToggle />
      </SidebarContent>
      <SidebarSeparator className="mx-auto" />
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
