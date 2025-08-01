"use client";

import { redirect, useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "./_components/form/reset-password-form";
import { PageRoutes } from "@/constants/page-routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) return redirect(PageRoutes.LOGIN);

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
