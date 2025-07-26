import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, CalendarDays, TrendingUp } from "lucide-react";
import ProgressForm from "./form/progress-form";

const ProgressOverview = () => {
  const TOTAL_HOURS_NEED = 240;
  const TOTAL_PROGRESS = 120;
  const TOTAL_PERCENTAGE = 50;
  const TOTAL_REMAINING = 120;

  return (
    <div className="mx-auto w-full">
      <Card className="border-border border bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <CardContent className="flex space-x-6">
          <div>
            <div className="mb-8 flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                  <TrendingUp className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300">
                    Progress Overview
                  </h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Track your internship completion journey
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Hours Completed
                  </span>
                  <span className="text-muted-foreground rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-700">
                    {TOTAL_PROGRESS} / {TOTAL_HOURS_NEED}
                  </span>
                </div>

                <div className="space-y-3">
                  <Progress
                    value={TOTAL_PERCENTAGE}
                    className="h-3 bg-gray-100 dark:bg-gray-700"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {TOTAL_PERCENTAGE}% complete
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {TOTAL_REMAINING} hours remaining
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-blue-950/50 dark:to-blue-900/30">
                <CardContent>
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl bg-blue-500/10 p-3 transition-colors group-hover:bg-blue-500/20 dark:bg-blue-400/10">
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-blue-700 dark:text-blue-300">
                        {TOTAL_PROGRESS}
                      </span>
                      <span className="text-xs font-medium tracking-wide text-blue-600/70 uppercase dark:text-blue-400/70">
                        Hours Logged
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-to-br from-green-50 to-green-100/50 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-green-950/50 dark:to-green-900/30">
                <CardContent>
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl bg-green-500/10 p-3 transition-colors group-hover:bg-green-500/20 dark:bg-green-400/10">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-green-700 dark:text-green-300">
                        {"30"}
                      </span>
                      <span className="text-xs font-medium tracking-wide text-green-600/70 uppercase dark:text-green-400/70">
                        Days Completed
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-to-br from-amber-50 to-amber-100/50 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-amber-950/50 dark:to-amber-900/30">
                <CardContent>
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-xl bg-amber-500/10 p-3 transition-colors group-hover:bg-amber-500/20 dark:bg-amber-400/10">
                      <CalendarDays className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-amber-700 dark:text-amber-300">
                        30
                      </span>
                      <span className="text-xs font-medium tracking-wide text-amber-600/70 uppercase dark:text-amber-400/70">
                        Days Remaining
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <ProgressForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressOverview;
