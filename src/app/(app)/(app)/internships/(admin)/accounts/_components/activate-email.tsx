"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { Loader2, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ActivateEmail = ({ refetch }: { refetch: () => Promise<any> }) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync: authorizeEmail } = api.auth.authorizeEmail.useMutation();

  const handleAuthorize = async () => {
    if (!email.trim()) return;

    setIsLoading(true);
    const toastId = toast.loading("Authorizing email...");
    try {
      await authorizeEmail({ email });
      toast.success("Email authorized successfully", { id: toastId });
      setEmail("");
      refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Email Authorization
        </CardTitle>
        <CardDescription className="text-base">
          Manage authorized email addresses for system access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address to authorize"
                className="h-10 pl-10 shadow-none"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAuthorize} disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 animate-spin" />
              Authorizing
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-6 w-6" />
              Authorize Email
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivateEmail;
