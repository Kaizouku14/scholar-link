import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import { type Metadata } from "next";
import DocumentsHeader from "./_components/header";

export const metadata: Metadata = {
  title: "Documents",
};

const Page = () => {
  return (
    <div className="spacy-y-4 mx-auto w-full px-2">
      <PageBreadCrumb currentPage="Documents" />
      <DocumentsHeader />
    </div>
  );
};

export default Page;
