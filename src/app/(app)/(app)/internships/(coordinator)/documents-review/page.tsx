import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Review",
};

const Pages = () => {
  return (
    <div className="mx-auto space-y-4 px-2">
      <PageBreadCrumb currentPage="Document Review" />
    </div>
  );
};

export default Pages;
