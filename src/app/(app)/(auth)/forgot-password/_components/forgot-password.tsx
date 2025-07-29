"use client";
import { useState } from "react";
import { EmailStep } from "./email-step";
import { OtpStep } from "./otp-step";
import { authClient } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const ForgetPassword = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const onSuccess = () => setStep("otp");

  const { mutateAsync: verifyOtp } = api.auth.verifyOTP.useMutation();
  const handleSubmit = async () => {
    const response = await verifyOtp({ email, otp });

    if (!response) {
      toast.error("Invalid OTP");
      return;
    }
    setStep("reset");
  };

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
              onSubmit={handleSubmit}
            />
          </>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>

            {newPassword &&
              confirmPassword &&
              newPassword !== confirmPassword && (
                <p className="text-destructive text-center text-sm">
                  Passwords do not match.
                </p>
              )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
