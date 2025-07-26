"use client";

import { useMemo } from "react";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { NavGroups } from "./nav-group";
import { NAVIGATION_DATA } from "@/data/navigation-data";
import type { roleType } from "@/constants/roles";
import type { NavGroup } from "@/types/navigation";
import NavItemsSkeleton from "./nav-main-skeleton";

interface NavMainProps {
  userRole: roleType;
  isPending: boolean;
}

export function NavMain({ userRole, isPending }: NavMainProps) {
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
      {isPending ? (
        <NavItemsSkeleton itemLength={navigation.main.length} />
      ) : (
        <>
          {navigation.main.map((group: NavGroup, index: number) => (
            <NavGroups key={`main-${index}`} group={group} />
          ))}
        </>
      )}

      {/* Secondary Navigation */}
      {hasSecondaryNav && (
        <>
          <SidebarSeparator className="mx-auto" />
          {isPending ? (
            <NavItemsSkeleton itemLength={navigation.secondary!.length} />
          ) : (
            <>
              {navigation.secondary!.map((group: NavGroup, index: number) => (
                <NavGroups
                  key={`secondary-${index}`}
                  group={group}
                  notificationCounts={{
                    messages: 100,
                  }}
                />
              ))}
            </>
          )}
        </>
      )}

      {/* Management Navigation */}
      {hasManagementNav && (
        <>
          <SidebarSeparator className="mx-auto" />
          {isPending ? (
            <NavItemsSkeleton itemLength={navigation.management!.length} />
          ) : (
            <>
              {navigation.management!.map((group: NavGroup, index: number) => (
                <NavGroups key={`management-${index}`} group={group} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
