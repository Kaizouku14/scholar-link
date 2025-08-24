import type { Metadata } from "next";
import FormHeader from "./_components/form/form-header";
import CreateAccountForm from "./_components/form/create-account-form";

export const metadata: Metadata = {
  title: "Create Account",
};

const Page = () => {
  return (
    <div className="mx-auto w-full space-y-4 px-2">
      <FormHeader />
      <CreateAccountForm />
    </div>
  );
};

export default Page;
