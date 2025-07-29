"use client";
import { useState } from "react";
import { EmailStep } from "./email-step";
import { OtpStep } from "./otp-step";

const ForgetPassword = () => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const countDown = 300000;

  const onSuccess = () => setStep("otp");
  const handleResend = () => {};

  const handleSubmit = () => {};

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs space-y-4">
        {step === "email" ? (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Reset password</h1>
              <p className="text-muted-foreground text-sm">
                Enter your email address and we'll send you a verification code
                to reset your password.
              </p>
            </div>
            <EmailStep
              email={email}
              setEmail={setEmail}
              onSuccess={onSuccess}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Verify your email</h1>
              <div className="text-muted-foreground">
                We sent a 6-digit verification code to{" "}
                <span className="text-foreground font-medium">{email}</span>
              </div>
            </div>
            <OtpStep
              email={email}
              otp={otp}
              setOtp={setOtp}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleResend={handleResend}
              onSubmit={handleSubmit}
              remainingTime={countDown}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
