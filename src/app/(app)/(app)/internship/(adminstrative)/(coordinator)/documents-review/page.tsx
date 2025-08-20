import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";
import ReviewDocumentsTable from "./_components/table/table";

export const metadata: Metadata = {
  title: "Document Review",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto px-2">
      <PageBreadCrumb currentPage="Document Review" />
      <ReviewDocumentsTable />
    </div>
  );
};

export default Pages;
