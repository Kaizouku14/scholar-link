import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import ProgressOverview from "./_component/progress-overview";
import ManageProgressHeader from "./_component/header";

const Pages = () => {
  return (
    <div className="mx-auto space-y-4 px-2">
      <PageBreadCrumb currentPage="Progress" />

      <ManageProgressHeader />
      <div className="grid grid-cols-2 space-x-2">
        <ProgressOverview />
      </div>
    </div>
  );
};

export default Pages;
