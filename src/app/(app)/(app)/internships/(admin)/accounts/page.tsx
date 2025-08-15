import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import ManageAccountHeader from "./_components/header";
import ActivateEmail from "./_components/activate-email";
import { Separator } from "@/components/ui/separator";
import AccountsTable from "./_components/table/table";

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Manage Accounts" />
      <ManageAccountHeader />
      <ActivateEmail />
      <Separator />
      <AccountsTable />
    </div>
  );
};

export default Pages;
