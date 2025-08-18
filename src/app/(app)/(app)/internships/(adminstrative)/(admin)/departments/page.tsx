import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import DeparmentsHeader from "./_components/header";

const Pages = () => {
  return (
    <div className="mx-auto w-full space-y-4">
      <PageBreadCrumb currentPage="Departments" />
      <DeparmentsHeader />
    </div>
  );
};

export default Pages;
