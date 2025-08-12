"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, CheckCircle, CalendarDays, TrendingUp } from "lucide-react";
import ProgressForm from "./form/progress-form";
import { api } from "@/trpc/react";
import { useMemo } from "react";
import type { GelLocalDateStringBuilderInitial } from "drizzle-orm/gel-core";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressOverviewSkeleton } from "./progres-overview-skeleton";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import ProgressLogs from "./progress-logs";

const ProgressOverview = () => {
  const { data, refetch, isLoading } =
    api.internships.getStudentLogProgress.useQuery();
  const progress = useMemo(() => {
    if (!data || data.length === 0) return null;

    const required = data[0]?.totalHoursRequired ?? 0;
    const completed = data.reduce((sum, log) => sum + log.hoursLog, 0);
    const logs =
      data?.map((log) => ({
        hoursLog: log.hoursLog,
        dateLogs: log.dateLogs,
      })) ?? [];
    const percentage =
      required > 0 ? Number(((completed / required) * 100).toFixed(1)) : 0;
    const uniqueDays = new Set(
      data.map((log) => new Date(log.dateLogs).toDateString()),
    );

    const daysCompleted = uniqueDays.size;
    const remainingHours = Math.max(required - completed, 0);
    const estimatedRemainingDays = Math.ceil(remainingHours / 8); // cap at 8hrs/day

    return {
      required,
      completed,
      logs,
      percentage,
      daysCompleted,
      remainingHours,
      estimatedRemainingDays,
    };
  }, [data]);

  return (
    <div className="mx-auto w-full">
      <Card>
        <CardContent className="md:flex md:space-x-6">
          <div className="mb-6 block md:hidden">
            <ProgressForm refetch={refetch} />
          </div>
          <div className="flex flex-col max-md:justify-center max-md:gap-y-4">
            <div className="mb-4 flex flex-col md:mb-8 md:space-y-4">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <div className="hidden rounded-lg bg-blue-100 p-2 md:block dark:bg-blue-900/30">
                  <TrendingUp className="text-primary h-6 w-6" />
                </div>
                <div className="text-center md:text-start">
                  <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent md:text-3xl dark:from-white dark:to-gray-300">
                    Progress Overview
                  </h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Track your internship completion journey.
                  </p>
                </div>
              </div>
            </div>
            {isLoading ? (
              <ProgressOverviewSkeleton />
            ) : (
              <>
                <div>
                  <div className="border-border rounded-2xl border bg-white p-6 dark:border-gray-700/50 dark:bg-gray-800/50">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Hours Completed
                      </span>
                      <span className="text-muted-foreground rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-700">
                        {progress?.completed ?? 0} / {progress?.required ?? 0}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <Progress
                        value={progress?.completed ?? 0}
                        className="h-3 bg-gray-100 dark:bg-gray-700"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {progress?.percentage ?? 0}% complete
                          </span>
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {progress?.remainingHours ?? 0} hours remaining
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 lg:grid-cols-3">
                  <Card className="group border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30">
                    <CardContent>
                      <div className="flex items-center gap-2.5">
                        <div className="rounded-xl bg-blue-500/10 p-3 transition-colors group-hover:bg-blue-500/20 dark:bg-blue-400/10">
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-blue-700 dark:text-blue-300">
                            {progress?.completed ?? 0}
                          </span>
                          <span className="text-xs font-medium tracking-wide text-blue-600/70 uppercase dark:text-blue-400/70">
                            Hours Logged
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group border-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30">
                    <CardContent>
                      <div className="flex items-center gap-2.5">
                        <div className="rounded-xl bg-green-500/10 p-3 transition-colors group-hover:bg-green-500/20 dark:bg-green-400/10">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-green-700 dark:text-green-300">
                            {progress?.daysCompleted ?? 0}
                          </span>
                          <span className="text-xs font-medium tracking-wide text-green-600/70 uppercase dark:text-green-400/70">
                            Days Completed
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group border-0 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/50 dark:to-amber-900/30">
                    <CardContent>
                      <div className="flex items-center gap-2.5">
                        <div className="rounded-xl bg-amber-500/10 p-3 transition-colors group-hover:bg-amber-500/20 dark:bg-amber-400/10">
                          <CalendarDays className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-amber-700 dark:text-amber-300">
                            {progress?.estimatedRemainingDays ?? 0}
                          </span>
                          <span className="text-xs font-medium tracking-wide text-amber-600/70 uppercase dark:text-amber-400/70">
                            Days Remaining
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>

          <div className="hidden w-1/2 md:flex">
            <ProgressForm refetch={refetch} />
          </div>
        </CardContent>
        <CardFooter className="flex w-full flex-col space-y-4">
          <Separator />
          <ProgressLogs logs={progress?.logs} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProgressOverview;
