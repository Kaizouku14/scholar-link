"use client";

import HeaderSkeleton from "@/components/skeleton/header-skeleton";
import ScholarshipProgramNotFound from "@/components/skeleton/not-found";
import SectionSkeleton from "@/components/skeleton/section-skeleton";
import { api } from "@/trpc/react";
import ProgramDetailsHeader from "./header";

const ScholarshipDetails = ({ id }: { id: string }) => {
  const { data, isLoading } =
    api.scholarships.getScholarshipProgramById.useQuery({ id });

  return (
    <div className="w-full">
      {!isLoading && data?.program ? (
        <ProgramDetailsHeader data={data.program} />
      ) : (
        <>
          <HeaderSkeleton />
          <SectionSkeleton />
        </>
      )}
    </div>
  );
};

export default ScholarshipDetails;
