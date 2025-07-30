"use client";

import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { PageRoutes } from "@/constants/page-routes";
import { useState } from "react";

export const EmailStep = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      toast.success("OTP sent successfully! Check your email.", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("An error occurred: " + (error as Error).message, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

      <div></div>
      <Button type="submit" className="w-full" disabled={!email || isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Send verification code"
        )}
      </Button>

      <div className="text-muted-foreground text-center text-sm">
        Remember your password?{" "}
        <Link
          href={PageRoutes.LOGIN}
          className="hover:text-primary/85 text-primary underline"
        >
          Back to login
        </Link>
      </div>
    </form>
  );
};
