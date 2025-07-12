"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface PageHeaderLayoutProps {
  subPage?: string;
  currentPage: string;
}

const PageBreadCrumb: React.FC<PageHeaderLayoutProps> = ({
  currentPage,
  subPage,
}) => {
  const pathname = usePathname();
  const activeStyle = "font-medium text-primary";
  const inactiveStyle = "text-muted-foreground";

  /**
   * Returns the parent path of a given path string.
   *
   * This function takes a path string, splits it into segments,
   * and returns the parent path by joining all segments except the last one.
   * If the path has only one segment or is empty, it returns "/".
   *
   * @param path - The path string to process.
   * @returns The parent path string.
   */
  const getParentPath = (path: string): string => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length <= 1) return "/";
    return "/" + segments.slice(0, -1).join("/");
  };

  const parentPath = getParentPath(pathname);

  return (
    <Breadcrumb className="mt-1 flex items-center">
      <Separator
        orientation="vertical"
        className="mr-2.5 data-[orientation=vertical]:h-4"
      />
      <BreadcrumbList className="flex items-center">
        <BreadcrumbItem>
          {subPage ? (
            <BreadcrumbLink asChild>
              <Link href={parentPath} className={inactiveStyle}>
                {currentPage}
              </Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage className={activeStyle}>
              {currentPage}
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {subPage && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className={activeStyle}>{subPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadCrumb;
