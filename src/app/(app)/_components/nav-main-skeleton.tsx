import { SidebarGroup } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NavItemsSkeleton = ({ itemLength }: { itemLength: number }) => {
  return (
    <SidebarGroup>
      <Skeleton className="h-4 w-1/2 animate-pulse rounded-md" />
      <div className="mt-2 space-y-1">
        {Array.from({ length: itemLength }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-8 w-full animate-pulse rounded-md"
          />
        ))}
      </div>
    </SidebarGroup>
  );
};

export default NavItemsSkeleton;
