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
      <div className="w-full max-w-xs">
        {step === "email" ? (
          <EmailStep
            email={email}
            setEmail={setEmail}
            onSuccess={onSuccess}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
