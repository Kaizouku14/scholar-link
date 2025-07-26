import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import ProgressOverview from "./_component/progress-overview";

const Pages = () => {
  return (
    <div className="mx-auto space-y-4 px-2">
      <PageBreadCrumb currentPage="Progress" />

      <div className="bg-primary mt-4 w-full rounded-lg p-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            Manage Internship Progress.
          </h1>
          <p className="text-sm font-medium text-white/90 md:text-base">
            Manage all your scholarship & coordinators account here.
          </p>
        </div>
      </div>
      <ProgressOverview />
    </div>
  );
};

export default Pages;
