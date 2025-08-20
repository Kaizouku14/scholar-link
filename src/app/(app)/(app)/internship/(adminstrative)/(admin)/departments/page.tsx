import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import DeparmentsHeader from "./_components/header";
import DeparmentsTable from "./_components/table/table";

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4">
      <PageBreadCrumb currentPage="Departments" />
      <DeparmentsHeader />
      <DeparmentsTable />
    </div>
  );
};

export default Pages;
