import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import InternshipForm from "./_components/internship-form";
import FormHeader from "./_components/form-header";

const Page = () => {
  return (
    <div className="mx-auto px-2">
      <PageBreadCrumb currentPage="Progress" subPage="Company Details" />
      <div className="mt-2 flex flex-col gap-2">
        <FormHeader />
        <InternshipForm />
      </div>
    </div>
  );
};

export default Page;
