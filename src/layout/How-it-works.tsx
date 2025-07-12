import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MENU_ITEMS } from "@/constants/header-menu";
import React from "react";

const HowItWorks = () => {
  return (
    <section
      id={MENU_ITEMS.HOW_IT_WORKS}
      className="mx-4 flex flex-col items-center space-y-6 "
    >
      <div className="flex w-full flex-col items-center text-center">
        <h1 className="text-2xl font-bold md:text-3xl">
          One platform. Endless opportunities.
        </h1>
        <p className="md:w-1/2">
          Easily manage your scholarship and internship applications with the
          BulSU Sarmiento Campus Scholarship & Internship Management system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="h-96 w-80 md:size-[38rem]">
            <CardHeader>
              <CardTitle>{index + 1}</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
