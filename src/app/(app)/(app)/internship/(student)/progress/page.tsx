import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import ProgressOverview from "./_component/progress-overview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress",
};
const Pages = () => {
  return (
    <div className="mx-auto space-y-4 px-2">
      <PageBreadCrumb currentPage="Progress" />
      <ProgressOverview />
    </div>
  );
};

export default Pages;
