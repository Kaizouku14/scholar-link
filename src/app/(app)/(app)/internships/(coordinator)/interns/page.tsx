import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import InternshipHeader from "./_components/header";
import InternshipTable from "./_components/table/table";

const Page = () => {
  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Interns" />
      <InternshipHeader />
      <InternshipTable />
    </div>
  );
};

export default Page;
