"use client";

import { api } from "@/trpc/react";
import ScholarshipProgramNotFound from "./not-found";
import HeaderSkeleton from "./skeleton/header-skeleton";
import SectionSkeleton from "./skeleton/section-skeleton";
import ScholarshipHeader from "./scholarship-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef } from "react";
import { ApplicationForm } from "./form/flexible-form";
import { isDeadlinePassed } from "@/lib/utils";
import RenderContent from "@/components/titap/render-content";

const ProgramSection = ({ id }: { id: string }) => {
  const [tab, setTab] = useState("program-overview");
  const applicationRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } =
    api.scholarships.getScholarshipProgramById.useQuery({ id });

  if (isLoading)
    return (
      <>
        <HeaderSkeleton />
        <SectionSkeleton />
      </>
    );

  if (!data?.program) return <ScholarshipProgramNotFound />;

  const isPassed = isDeadlinePassed(data.program.deadline);
  return (
    <div className="w-full">
      <ScholarshipHeader
        data={data.program}
        setTab={setTab}
        applicationRef={applicationRef}
      />
      <div className="container mx-auto">
        <div className="space-y-6 py-6 md:py-8">
          <Tabs
            defaultValue={"program-overview"}
            value={tab}
            onValueChange={setTab}
            className="w-full"
          >
            {!isPassed && (
              <TabsList>
                <TabsTrigger value="program-overview">
                  Program Overview
                </TabsTrigger>

                {data.program.submissionType === "online" &&
                  data.requirements &&
                  data.requirements.length > 0 && (
                    <TabsTrigger value="application">Application</TabsTrigger>
                  )}

                {data.program.announcements &&
                  data.program.announcements.length > 0 && (
                    <TabsTrigger value="announcement">
                      Announcements
                    </TabsTrigger>
                  )}
              </TabsList>
            )}

            <TabsContent value="program-overview">
              <div className="flex flex-col space-y-6 max-md:items-center md:flex-row md:justify-evenly md:space-y-0 md:space-x-6">
                <div className="flex flex-1 flex-col gap-4 px-6">
                  <RenderContent content={data.program.section} />
                </div>

                <div className="border-border bg-background h-fit w-full max-w-md flex-shrink-0 rounded-xl border p-6">
                  <div className="mb-4">
                    <h2 className="text-primary mb-2 text-2xl font-bold">
                      Requirements
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Prepare the following requirements before applying:
                    </p>
                  </div>

                  <ol className="text-foreground list-inside list-decimal space-y-2">
                    {data?.requirements.map((r, index) => (
                      <li key={index} className="px-3 py-1 text-sm font-medium">
                        {r.label}
                      </li>
                    ))}
                  </ol>

                  <p className="text-muted-foreground mt-6 text-sm">
                    📧 After submitting all the requirements, please wait for
                    our email. <br />
                    Always check your inbox and spam folder to make sure you
                    don&apos;t miss it.
                  </p>
                </div>
              </div>
            </TabsContent>
            {data.program.submissionType === "online" &&
              data.requirements.length > 0 && (
                <TabsContent value="application">
                  <div
                    id="apply"
                    className="scroll-mt-20 pt-6"
                    ref={applicationRef}
                  >
                    <div className="overflow-hidden rounded-lg border">
                      <ApplicationForm
                        requirements={data.requirements}
                        programId={id}
                      />
                    </div>
                  </div>
                </TabsContent>
              )}

            {data.program.announcements &&
              data.program.announcements.length > 0 && (
                <TabsContent value="announcement">
                  <RenderContent content={data.program.announcements} />
                </TabsContent>
              )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;
