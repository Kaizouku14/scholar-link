"use client";

import { ShareButton } from "@/components/dropdown/share-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import type { ScholarshipCardProps } from "@/interfaces/scholarship/scholarship-card";
import { calculateDaysLeft, isDeadlineApproaching } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar,
  Users,
  ArrowLeft,
  Clock,
  FileText,
  Globe,
  AlertTriangle,
  CheckCircle,
  CloudUpload,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { RefObject } from "react";

const ScholarshipHeader = ({
  data,
  setTab,
  applicationRef,
}: {
  data: ScholarshipCardProps;
  setTab: (tab: string) => void;
  applicationRef?: RefObject<HTMLDivElement | null>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const daysUntilDeadline = calculateDaysLeft(data.deadline);
  const isDeadlineSoon = isDeadlineApproaching(data.deadline);
  const isDeadlinePassed = daysUntilDeadline < 0;
  const isSlotsAvailable = data.slots > 0;

  return (
    <section className="border-b bg-gradient-to-r from-gray-500/10 to-gray-500/5">
      <div className="container px-4 py-8 md:px-12 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Button
                  variant={"link"}
                  onClick={() => router.back()}
                  className="text-primary inline-flex items-center text-sm font-medium transition-colors hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Scholarships
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="font-medium">
                  {data.type}
                </Badge>
                <Badge
                  variant="outline"
                  className={`font-medium ${data.submissionType === "online" ? "border-green-200 bg-green-100 text-green-800" : "border-blue-200 bg-blue-100 text-blue-800"}`}
                >
                  <Globe className="mr-1 h-3 w-3" />
                  {data.submissionType}
                </Badge>
                {isDeadlinePassed && (
                  <Badge variant="destructive">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Deadline Passed
                  </Badge>
                )}
                {isDeadlineSoon && !isDeadlinePassed && (
                  <Badge variant="destructive">
                    <Clock className="mr-1 h-3 w-3" />
                    Deadline Soon
                  </Badge>
                )}
                {isSlotsAvailable && !isDeadlinePassed && (
                  <Badge
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Open for Applications
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {data.name}
              </h1>

              {data.description && (
                <div className="flex items-start gap-3">
                  <FileText className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-lg">
                    {data.description}
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background/50 flex items-center gap-3 rounded-lg border p-4">
                <div
                  className={`rounded-full p-2 ${isDeadlineSoon || isDeadlinePassed ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
                >
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-sm font-medium">
                    Application Deadline
                  </p>
                  <p
                    className={`font-semibold ${isDeadlineSoon || isDeadlinePassed ? "text-primary" : "text-foreground"}`}
                  >
                    {format(new Date(data.deadline), "MMM, dd yyyy")}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {isDeadlinePassed
                      ? `${Math.abs(daysUntilDeadline)} days ago`
                      : daysUntilDeadline === 0
                        ? "Today"
                        : `${daysUntilDeadline} days left`}
                  </p>
                </div>
              </div>

              <div className="bg-background/50 flex items-center gap-3 rounded-lg border p-4">
                <div
                  className={`rounded-full p-2 ${data.slots > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                >
                  <Users className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-sm font-medium">
                    Available Slots
                  </p>
                  <p className="text-foreground font-semibold">
                    {data.slots} {data.slots === 1 ? "slot" : "slots"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {data.slots > 0
                      ? "Applications open"
                      : "No slots available"}
                  </p>
                </div>
              </div>

              <div className="bg-background/50 flex items-center gap-3 rounded-lg border p-4 sm:col-span-2 lg:col-span-1">
                <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                  <CloudUpload className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-sm font-medium">
                    Submission
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {data.submissionType === "online"
                      ? "Remote application"
                      : data.submissionType === "on-site"
                        ? "Physical location"
                        : "Hybrid application"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                size="lg"
                disabled={isDeadlinePassed}
                className="flex-1 cursor-pointer py-2.5 sm:flex-none md:py-1"
                onClick={() => {
                  setTab("application");
                  setTimeout(() => {
                    applicationRef?.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                {isDeadlinePassed ? "Application Closed" : "Apply Now"}
              </Button>
              <ShareButton
                url={`${env.NEXT_PUBLIC_BETTER_AUTH_URL}${pathname}`}
              />
            </div>
          </div>

          <div className="flex-shrink-0 lg:w-80">
            <div className="bg-background relative hidden overflow-hidden rounded-xl border shadow-lg md:block">
              {/* {TODO: Replace this with actual image placeholder} */}
              <Image
                src={data.imageUrl ?? "/placeholder.svg?height=320&width=400"}
                alt={`${data.name} scholarship program`}
                width={400}
                height={320}
                className="h-64 w-full object-cover lg:h-80"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipHeader;
