import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";
import DocumentsReviewHeader from "./_components/header";
import ReviewDocumentsTable from "./_components/table/table";

export const metadata: Metadata = {
  title: "Document Review",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto space-y-4 px-2">
      <PageBreadCrumb currentPage="Document Review" />
      <DocumentsReviewHeader />
      <ReviewDocumentsTable />
    </div>
  );
};

export default Pages;
