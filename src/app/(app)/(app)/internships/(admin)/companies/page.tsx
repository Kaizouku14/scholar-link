import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import type { Metadata } from "next";
import CompaniesTable from "./_components/table/table";
import CompaniesHeader from "./_components/header";

export const metadata: Metadata = {
  title: "Companies",
};

const Pages = () => {
  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Companies" />
      <CompaniesHeader />
      <CompaniesTable />
    </div>
  );
};

export default Pages;
