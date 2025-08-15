import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Internships",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Manage Internships" />
    </div>
  );
};

export default Pages;
