"use client";

import { ResetPasswordForm } from "./_components/form/reset-password-form";

const ResetPasswordPage = () => {
  const token = new URLSearchParams(window.location.search).get("token");

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your new password
          </p>
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
