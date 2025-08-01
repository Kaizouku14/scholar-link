import type { Metadata } from "next";
import LoginForm from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
