import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import InternshipHeader from "./_components/header";
import InternshipTable from "./_components/table/table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interns",
};

const Page = () => {
  return (
    <div className="mx-auto h-auto w-full space-y-4">
      <PageBreadCrumb currentPage="Interns" />
      <InternshipHeader />
      <InternshipTable />
    </div>
  );
};

export default Page;
