"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const FormHeader = () => {
  const router = useRouter();

  const handleBackButton = () => {
    router.push(PageRoutes.INTERNSHIPS_PROGRESS);
  };

  return (
    <div className="mt-6 flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        title="back"
        onClick={handleBackButton}
      >
        <ChevronLeft className="size-6" />
      </Button>
      <div>
        <small className="text-muted-foreground">Back to Progress</small>

        <h2 className="text-lg leading-tight font-semibold">Company Details</h2>
      </div>
    </div>
  );
};

export default FormHeader;
