import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import { type Metadata } from "next";
import UpcomingDeadlines from "./_components/upcoming-deadlines";
import Documents from "./_components/documents";
import DocumentForm from "./_components/form/document-form";

export const metadata: Metadata = {
  title: "Documents",
};

const Page = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Documents" />
      <div className="flex gap-2">
        <UpcomingDeadlines />
        <DocumentForm />
      </div>
      <Documents />
    </div>
  );
};

export default Page;
