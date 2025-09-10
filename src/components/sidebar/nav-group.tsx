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
import type {
  NavGroup as NavGroupType,
  NotificationCounts,
} from "@/interfaces/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface NavGroupProps {
  group: NavGroupType;
  notificationCounts?: NotificationCounts;
}

export function NavGroups({ group, notificationCounts }: NavGroupProps) {
  const pathname = usePathname();

  const isActiveRoute = (url: string) => {
    if (url === "/dashboard") return pathname === url;
    return pathname.startsWith(url);
  };

  const getBadgeCount = (badgeType?: string): number => {
    if (!badgeType || !notificationCounts) return 0;
    return notificationCounts[badgeType as keyof NotificationCounts] ?? 0;
  };

  const content = (
    <SidebarGroupContent>
      <SidebarMenu>
        {group.items.map((item) => {
          const badgeCount = getBadgeCount(item.badgeType);
          const showBadge = item.badge ?? (item.badgeType && badgeCount > 0);

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActiveRoute(item.url)}
                tooltip={item.description ?? item.title}
                className="group relative"
              >
                <Link href={item.url} className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    {item.icon && <item.icon className="h-5 w-5" />}

                    {/* Badge for icon mode - positioned absolutely over the icon */}
                    {showBadge && (
                      <div
                        className={cn(
                          `${isActiveRoute(item.url) ? "bg-white" : "bg-primary"} absolute top-0 right-0 size-2.5`,
                          "flex items-center justify-center rounded-full",
                          "hidden group-data-[collapsible=icon]:block",
                        )}
                      ></div>
                    )}
                  </div>

                  <span className="flex-1 truncate">{item.title}</span>

                  {/* Badge for expanded mode */}
                  {showBadge && (
                    <Badge
                      className={`ml-auto h-5 px-1.5 text-xs group-data-[collapsible=icon]:hidden ${isActiveRoute(item.url) ? "bg-white text-black" : ""}`}
                      variant={
                        isActiveRoute(item.url) ? "secondary" : "default"
                      }
                    >
                      {item.badgeType
                        ? badgeCount > 99
                          ? "99+"
                          : badgeCount
                        : item.badge}
                    </Badge>
                  )}
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
