import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import DocumentListTable from "./_components/table/table";
import DocumentListHeader from "./_components/header";

const Page = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Documents" />
      <DocumentListHeader />
      <DocumentListTable />
    </div>
  );
};

export default Page;
