import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents",
};

const Page = () => {
  return (
    <div>
      <PageBreadCrumb currentPage="Documents" />
    </div>
  );
};

export default Page;
