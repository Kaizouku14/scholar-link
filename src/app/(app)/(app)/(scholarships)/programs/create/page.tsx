import PageBreadCrumb from "@/components/breadcrumbs/page-header";
import FormHeader from "./_components/form-header";
import ScholarshipForm from "./_components/form";

const CreateProgramForm = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-4">
      <PageBreadCrumb currentPage="Programs" subPage="Create Program" />
      <FormHeader />
      <ScholarshipForm />
    </div>
  );
};

export default CreateProgramForm;
