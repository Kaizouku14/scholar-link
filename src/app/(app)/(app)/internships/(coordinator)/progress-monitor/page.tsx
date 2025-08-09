import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";
import ProgressMonitoringHeader from "./_components/header";

export const metadata: Metadata = {
  title: "Progress Monitor",
};

const Page = () => {
  return (
    <div className="mx-auto h-auto space-y-4 px-2">
      <PageBreadCrumb currentPage="Progress Monitor" />
      <ProgressMonitoringHeader />
    </div>
  );
};

export default Page;
