import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import ManageAccountHeader from "./_components/header";
import AccountsTable from "./_components/table/table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Accounts",
};

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Manage Accounts" />
      <ManageAccountHeader />
      <AccountsTable />
    </div>
  );
};

export default Pages;
