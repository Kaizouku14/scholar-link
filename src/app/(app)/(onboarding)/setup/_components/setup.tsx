"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import CombinedSetupForm from "./form/combined-setup-form";
import FinishingSetup from "./loader/finishing-setup";

const SetupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const progressValue = (currentStep / totalSteps) * 100;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <FinishingSetup />
      ) : (
        <Card className="z-10 w-full max-w-lg border-none bg-transparent opacity-90 shadow-none backdrop-blur-xl">
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
              <Progress
                value={progressValue}
                className="h-2 w-full rounded-full"
              />
              <div className="text-muted-foreground flex items-center justify-between text-sm font-medium">
                <span className="text-muted-foreground font-semibold">
                  Step {currentStep}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-700">
                  {currentStep} / {totalSteps}
                </span>
              </div>
            </div>
            <CombinedSetupForm
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setIsLoading={setIsLoading}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SetupPage;
