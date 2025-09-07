"use client";

import { api } from "@/trpc/react";
import ScholarshipProgramNotFound from "./not-found";
import HeaderSkeleton from "./skeleton/header-skeleton";
import SectionSkeleton from "./skeleton/section-skeleton";
import ScholarshipDetails from "./tabs/scholarship-details";
import ScholarshipHeader from "./scholarship-header";

const Section = ({ id }: { id: string }) => {
  const { data, isLoading } =
    api.scholarships.getScholarshipProgramById.useQuery({ id });

  if (isLoading)
    return (
      <>
        <HeaderSkeleton />
        <SectionSkeleton />
      </>
    );

  if (!data) return <ScholarshipProgramNotFound />;

  return (
    <div className="w-full">
      <ScholarshipHeader data={data} />
      <div className="container mx-auto">
        <div className="space-y-6 py-6 md:py-8">
          <div className="flex justify-evenly">
            <div className="flex-1 flex-col gap-1">
              <ScholarshipDetails content={data.section} />
            </div>
            <div className="border-border size-96 rounded-xl border"></div>
          </div>

          <div id="apply" className="scroll-mt-20 pt-6">
            <div className="overflow-hidden rounded-lg border">
              <div className="bg-primary/10 border-b p-4">
                <h2 className="text-2xl font-bold">Apply Now</h2>
                <p className="text-muted-foreground">
                  Complete the application form below and upload all required
                  documents to apply for the scholarship.
                </p>
              </div>
              <div className="p-6">{/* <ApplicationForm /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
