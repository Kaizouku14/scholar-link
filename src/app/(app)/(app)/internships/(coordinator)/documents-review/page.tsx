import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";
import ReviewDocumentsTable from "./_components/table/table";
import DocumentForm from "./_components/form/document-form";
import UpcomingDeadlines from "@/components/cards/upcoming-deadlines";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Document Review",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto space-y-6 px-2">
      <PageBreadCrumb currentPage="Document Review" />
      <div className="flex gap-2">
        <UpcomingDeadlines />
        <DocumentForm />
      </div>
      <Separator />
      <ReviewDocumentsTable />
    </div>
  );
};

export default Pages;
