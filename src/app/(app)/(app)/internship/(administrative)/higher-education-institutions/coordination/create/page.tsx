import InternshipForm from "./_components/internship-form";
import FormHeader from "./_components/form-header";

const Page = () => {
  return (
    <div className="mx-auto flex flex-col gap-2 px-2">
      <FormHeader />
      <InternshipForm />
    </div>
  );
};

export default Page;
