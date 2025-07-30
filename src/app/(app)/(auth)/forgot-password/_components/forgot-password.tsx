"use client";

import { useState } from "react";
import { EmailStep } from "./email-step";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we'll send you a verification code to
            reset your password.
          </p>
        </div>
        <EmailStep
          email={email}
          setEmail={setEmail}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default ForgetPassword;
