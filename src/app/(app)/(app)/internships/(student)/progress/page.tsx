import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import ProgressOverview from "./_component/progress-overview";
import ManageProgressHeader from "./_component/header";
import ProgressForm from "./_component/form/progress-form";

const Pages = () => {
  return (
    <div className="mx-auto space-y-4 px-2">
      <PageBreadCrumb currentPage="Progress" />

      <ManageProgressHeader />
      <ProgressOverview />
    </div>
  );
};

export default Pages;
