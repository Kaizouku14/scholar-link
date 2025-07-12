import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import ManageAccountHeader from "./_components/header";
import ActivateEmail from "./_components/activate-email";
import { DataTable } from "@/components/table/data-table";
import { AccountColumns } from "./_components/table/column";
import { Separator } from "@/components/ui/separator";

const mockData = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Moderator",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "User",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Admin",
  },
  {
    id: "5",
    name: "Mike Davis",
    email: "mike.davis@example.com",
    role: "Moderator",
  },
];

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Manage Accounts" />
      <ManageAccountHeader />
      <ActivateEmail />
      <Separator />
      <DataTable
        columns={AccountColumns}
        data={mockData}
        filteredTitle={"email"}
      />
    </div>
  );
};

export default Pages;
