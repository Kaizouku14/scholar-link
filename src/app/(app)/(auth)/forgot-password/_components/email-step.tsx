"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { PageRoutes } from "@/constants/page-routes";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  onSuccess: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const EmailStep = ({
  email,
  setEmail,
  onSuccess,
  isLoading,
  setIsLoading,
}: EmailStepProps) => {
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const response = await authClient.forgetPassword.emailOtp({ email });
      if (response.error) throw new Error(response.error.message);

      toast.success("OTP sent successfully! Check your email.", {
        position: "top-center",
      });

      onSuccess();
    } catch (error) {
      toast.error("An error occurred: " + (error as Error).message, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we'll send you a verification code to
            reset your password.
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!email || isLoading}
          >
            {isLoading
              ? "Sending verification code..."
              : "Send verification code"}
          </Button>
        </form>

        <div className="text-muted-foreground text-center text-sm">
          Remember your password?{" "}
          <Link
            href={PageRoutes.LOGIN}
            className="hover:text-primary/85 text-primary underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};
