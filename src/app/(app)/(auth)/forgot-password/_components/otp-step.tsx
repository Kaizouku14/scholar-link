"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";

interface OtpStepProps {
  otp: string;
  setOtp: (otp: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSubmit: () => void;
}

export const OtpStep = ({ otp, setOtp, isLoading, onSubmit }: OtpStepProps) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleResend = () => {
    setRemainingTime(100);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
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
              ? `Resend in (${formatTime(remainingTime)})s`
              : "Resend code"}
          </Button>
        </div>
      </div>
    </>
  );
};
