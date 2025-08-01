import type { Metadata } from "next";
import SignUpForm from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
