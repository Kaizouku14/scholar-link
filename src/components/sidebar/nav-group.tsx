"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavGroup as NavGroupType } from "@/interfaces/navigation";

interface NavGroupProps {
  group: NavGroupType;
}

export function NavGroups({ group }: NavGroupProps) {
  const pathname = usePathname();

  const isActiveRoute = (url: string) => {
    if (url === "/dashboard") return pathname === url;
    return pathname.startsWith(url);
  };

  const content = (
    <SidebarGroupContent>
      <SidebarMenu>
        {group.items.map((item) => {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActiveRoute(item.url)}
                tooltip={item.description ?? item.title}
                className="group relative"
              >
                <Link href={item.url} className="flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    {item.icon && <item.icon className="h-5 w-5" />}
                  </div>

                  <span className="flex-1 truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
      {content}
    </SidebarGroup>
  );
}
