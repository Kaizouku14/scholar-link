"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpStepProps {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  handleResend: () => void;
  onSubmit: () => void;
  remainingTime: number;
}

export const OtpStep = ({
  email,
  otp,
  setOtp,
  isLoading,
  handleResend,
  onSubmit,
  remainingTime,
}: OtpStepProps) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <div className="text-muted-foreground">
            We sent a 6-digit verification code to{" "}
            <span className="text-foreground font-medium">{email}</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-12 w-12" />
                <InputOTPSlot index={1} className="h-12 w-12" />
                <InputOTPSlot index={2} className="h-12 w-12" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="h-12 w-12" />
                <InputOTPSlot index={4} className="h-12 w-12" />
                <InputOTPSlot index={5} className="h-12 w-12" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </form>

        <div className="flex flex-col items-center space-y-4">
          <Button
            type="submit"
            className="w-84"
            disabled={otp.length !== 6 || isLoading}
            onClick={onSubmit}
          >
            {isLoading ? "Verifying..." : "Verify & Reset Password"}
          </Button>

          <div className="text-muted-foreground flex items-center space-x-1 text-sm">
            <span>Didn't receive the code?</span>
            <Button
              variant="link"
              className="h-auto p-0 text-sm"
              size="sm"
              onClick={handleResend}
              disabled={remainingTime > 0}
            >
              {remainingTime > 0
                ? `Resend in ${remainingTime}s`
                : "Resend code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
