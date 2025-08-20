"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "@/components/scholarship-details/tabs/about";
import Eligibility from "@/components/scholarship-details/tabs/eligibility";
import Requirements from "@/components/scholarship-details/tabs/requirement";
import Process from "@/components/scholarship-details/tabs/process";
import type { AdditionalInfo } from "@/interfaces/scholarship/scholarship-form";
import ScholarshipHeader from "./scholarship-header";
import { api } from "@/trpc/react";
import ScholarshipProgramNotFound from "./not-found";
import HeaderSkeleton from "./skeleton/header-skeleton";
import SectionSkeleton from "./skeleton/section-skeleton";

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

  console.log(data.additionalInfo);

  return (
    <div className="w-full">
      <ScholarshipHeader data={data} />
      <div className="container mx-auto">
        <div className="space-y-6 py-6 md:py-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="announcement">Announcement</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mx-1.5 space-y-6 pt-6">
              <About
                name={data.name}
                description={data.description}
                data={data.additionalInfo as unknown as AdditionalInfo}
              />
            </TabsContent>
            <TabsContent value="eligibility" className="mx-1.5 space-y-6 pt-6">
              <Eligibility
                name={data.name}
                data={data.additionalInfo as unknown as AdditionalInfo}
              />
            </TabsContent>
            <TabsContent value="requirements" className="mx-1.5 space-y-6 pt-6">
              <Requirements
                data={data.additionalInfo as unknown as AdditionalInfo}
              />
            </TabsContent>
            <TabsContent value="process" className="mx-1.5 space-y-6 pt-6">
              <Process
                name={data.name}
                data={data.additionalInfo as unknown as AdditionalInfo}
              />
            </TabsContent>
            {/* { TODO: Announcement } */}
            <TabsContent
              value="announcement"
              className="space-y-6 pt-6"
            ></TabsContent>
          </Tabs>

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
