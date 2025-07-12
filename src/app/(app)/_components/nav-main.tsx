"use client";

import { useMemo } from "react";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { NavGroups } from "./nav-group";
import { NAVIGATION_DATA } from "@/data/navigation-data";
import type { roleType } from "@/constants/roles";
import type { NavGroup } from "@/types/navigation";

interface NavMainProps {
  userRole: roleType;
}

export function NavMain({ userRole }: NavMainProps) {
  const navigation = useMemo(() => {
    return (
      NAVIGATION_DATA[userRole] || { main: [], secondary: [], management: [] }
    );
  }, [userRole]);

  const hasSecondaryNav =
    navigation.secondary && navigation.secondary.length > 0;
  const hasManagementNav =
    navigation.management && navigation.management.length > 0;

  return (
    <div>
      {/* Main Navigation */}
      {navigation.main.map((group: NavGroup, index: number) => (
        <NavGroups
          key={`main-${index}`}
          group={group}
          notificationCounts={{ messages: 0, applications: 0, documents: 0 }}
        />
      ))}

      {/* Secondary Navigation */}
      {hasSecondaryNav && (
        <>
          <SidebarSeparator className="mx-auto" />
          {navigation.secondary!.map((group: NavGroup, index: number) => (
            <NavGroups
              key={`secondary-${index}`}
              group={group}
              notificationCounts={{
                messages: 1,
                applications: 0,
                documents: 0,
              }}
            />
          ))}
        </>
      )}

      {/* Management Navigation */}
      {hasManagementNav && (
        <>
          <SidebarSeparator className="mx-auto" />
          {navigation.management!.map((group: NavGroup, index: number) => (
            <NavGroups key={`management-${index}`} group={group} />
          ))}
        </>
      )}
    </div>
  );
}
