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
import { Mail, ShieldCheck } from "lucide-react";

const ActivateEmail = () => {
  return (
    <Card>
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
                placeholder="Enter email address to authorize"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={"default"}>
          <ShieldCheck className="h-6 w-6" />
          Authorize Email
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivateEmail;
