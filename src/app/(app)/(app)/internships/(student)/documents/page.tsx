import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import { type Metadata } from "next";
import DocumentsHeader from "./_components/header";
import UpcomingDeadlines from "./_components/upcoming-deadlines";
import Documents from "./_components/documents";

export const metadata: Metadata = {
  title: "Documents",
};

const Page = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Documents" />
      <DocumentsHeader />
      <div className="grid grid-cols-2 gap-4">
        <UpcomingDeadlines />
        <Documents />
      </div>
    </div>
  );
};

export default Page;
