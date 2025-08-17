import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import DocumentListTable from "./_components/table/table";

const Page = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Documents" />

      <DocumentListTable />
    </div>
  );
};

export default Page;
