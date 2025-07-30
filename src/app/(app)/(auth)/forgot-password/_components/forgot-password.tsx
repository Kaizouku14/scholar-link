import { EmailStep } from "./email-step";

const ForgetPassword = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we'll send you a verification code to
            reset your password.
          </p>
        </div>
        <EmailStep />
      </div>
    </div>
  );
};

export default ForgetPassword;
