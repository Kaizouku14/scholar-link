import type { Metadata } from "next";
import ForgotPassword from "./_components/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const Page = () => {
  return <ForgotPassword />;
};

export default Page;
