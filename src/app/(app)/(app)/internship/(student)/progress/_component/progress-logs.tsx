import { CalendarDays, BarChart3, FileText, Pencil } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function ProgressLogs({
  logs,
}: {
  logs:
    | {
        hoursLog: number;
        dateLogs: Date;
        description: string;
      }[]
    | undefined;
}) {
  return (
    <div className="w-full p-2">
      <div className="w-full space-y-4">
        <div className="space-y-1">
          <h1 className="text-foreground text-2xl font-bold tracking-tight">
            Progress Logs
          </h1>
          <p className="text-muted-foreground text-sm">
            Track your daily progress and monitor your productivity over time
          </p>
        </div>
        <div className="border-border rounded-t-xl rounded-b-xl border shadow-none">
          <div className="border-border border-b p-4">
            <div className="text-foreground flex items-center gap-3 text-xl font-semibold">
              <div className="bg-primary/10 rounded-lg p-2">
                <CalendarDays className="text-primary h-5 w-5" />
              </div>
              Activity History
            </div>
          </div>
          <ScrollArea className="h-80 max-h-80">
            <div className="m-0 p-0">
              {logs?.length ? (
                <div className="divide-border divide-y rounded-xl p-2">
                  {logs.map((log, index) => (
                    <Card
                      key={index}
                      className="bg-card rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        {/* Left Section */}
                        <div className="space-y-1">
                          <h3 className="text-foreground text-sm font-semibold">
                            {format(log.dateLogs, "EEE, MMM d")}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {log.description}
                          </p>
                        </div>

                        {/* Right Section */}
                        <div className="flex flex-col items-end gap-2">
                          {/* Hours badge */}
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                            {Math.round(log.hoursLog)} hrs
                          </span>

                          {/* Action buttons */}
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-muted h-8 w-8"
                            >
                              <Pencil className="text-muted-foreground h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-muted h-8 w-8"
                            >
                              <FileText className="text-muted-foreground h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="bg-muted mb-4 rounded-full p-6">
                    <BarChart3 className="text-muted-foreground h-12 w-12" />
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    No progress logs yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Start tracking your progress to see your productivity
                    insights and session history here.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
