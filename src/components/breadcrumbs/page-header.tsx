"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ROUTE_LABELS } from "@/constants/page-routes";

export const PageBreadCrumb = () => {
  const pathname = usePathname();

  // break into segments → [internship, accounts, create]
  const parts = pathname.split("/").filter(Boolean);

  // skip first segment if it's just "internship"
  const relevant = parts[0] === "internship" ? parts.slice(1) : parts;

  // build cumulative paths like /internship/accounts, /internship/accounts/create
  const pathSegments = relevant.map((_, i) => {
    return "/" + ["internship", ...relevant.slice(0, i + 1)].join("/");
  });

  return (
    <Breadcrumb className="mt-1 flex items-center">
      <Separator
        orientation="vertical"
        className="mr-2.5 data-[orientation=vertical]:h-4"
      />
      <BreadcrumbList className="flex items-center">
        {pathSegments.map((segment, idx) => {
          const label = ROUTE_LABELS[segment] ?? segment.split("/").pop();
          const isLast = idx === pathSegments.length - 1;

          return (
            <BreadcrumbItem key={segment} className="flex items-center">
              {!isLast ? (
                <BreadcrumbLink asChild>
                  <Link href={segment} className="text-muted-foreground">
                    {label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-primary font-medium">
                  {label}
                </BreadcrumbPage>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
