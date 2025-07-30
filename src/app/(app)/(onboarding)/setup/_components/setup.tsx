"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ProfileSetupForm from "./form/profile-setup";

const SetupPage = () => {
  const currentStep = 1;
  const totalSteps = 3;
  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <Card className="z-10 w-full max-w-lg">
      <CardHeader className="m-0">
        <CardTitle className="flex text-2xl">
          <span>Welcome to Scholar</span>
          <span className="text-primary">Link</span>
          <span className="ml-1">🎓</span>
        </CardTitle>
        <CardDescription>
          Complete your student profile to get started with our platform!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2.5 flex flex-col gap-y-1">
          <Progress value={progressValue} className="h-2 w-full rounded-full" />
          <div className="text-muted-foreground flex items-center justify-between text-sm font-medium">
            <span className="text-muted-foreground font-semibold">
              Step {currentStep}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-700">
              {currentStep} / {totalSteps}
            </span>
          </div>
        </div>
        <ProfileSetupForm />
      </CardContent>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
};

export default SetupPage;
