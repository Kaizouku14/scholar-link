"use client";

import { useMemo } from "react";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { NavGroups } from "./nav-group";
import { NAVIGATION_DATA } from "@/data/navigation-data";
import type { roleType } from "@/constants/roles";
import type { NavGroup } from "@/interfaces/navigation";
import NavItemsSkeleton from "./nav-main-skeleton";
import { api } from "@/trpc/react";

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
  const { data, isLoading } = api.mail.getUnReadCount.useQuery();

  return (
    <div>
      {/* Main Navigation */}
      {isPending ? (
        <NavItemsSkeleton itemLength={5} />
      ) : (
        <>
          {navigation.main.map((group: NavGroup, index: number) => (
            <NavGroups key={`main-${index}`} group={group} />
          ))}
        </>
      )}

      {/* Secondary Navigation */}
      {isPending ? (
        <NavItemsSkeleton itemLength={1} />
      ) : (
        <>
          {hasSecondaryNav && (
            <>
              <SidebarSeparator className="mx-auto" />
              {navigation.secondary!.map((group: NavGroup, index: number) => (
                <NavGroups
                  key={`secondary-${index}`}
                  group={group}
                  notificationCounts={{
                    messages: isLoading ? 0 : data?.unReadCount,
                  }}
                />
              ))}
            </>
          )}
        </>
      )}

      {/* Management Navigation */}
      {isPending && hasManagementNav ? (
        <NavItemsSkeleton itemLength={1} />
      ) : hasManagementNav ? (
        <>
          <SidebarSeparator className="mx-auto" />
          {navigation.management!.map((group: NavGroup, index: number) => (
            <NavGroups key={`management-${index}`} group={group} />
          ))}
        </>
      ) : null}
    </div>
  );
}
