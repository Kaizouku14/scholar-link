import PageBreadCrumb from "@/components/breadcrumbs/page-header";

const Page = () => {
  return (
    <div className="mx-auto h-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Interns" />
    </div>
  );
};

export default Page;
