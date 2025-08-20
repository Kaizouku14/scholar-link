import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import FormHeader from "./_components/form/form-header";

const Page = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <PageBreadCrumb currentPage="Companies" subPage="Create Company" />
      <FormHeader />
    </div>
  );
};

export default Page;
