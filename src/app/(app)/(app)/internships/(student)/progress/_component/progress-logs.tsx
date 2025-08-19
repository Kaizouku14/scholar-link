import { format } from "date-fns";
import { CalendarDays, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProgressLogs({
  logs,
}: {
  logs:
    | {
        hoursLog: number;
        dateLogs: Date;
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
              Session History
            </div>
          </div>
          <ScrollArea className="h-80 max-h-80">
            <div className="m-0 p-0">
              {logs && logs?.length ? (
                <div className="divide-border divide-y rounded-xl">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className="hover:bg-muted/50 flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-6">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full md:h-12 md:w-12">
                          <CalendarDays className="text-primary h-4 w-4 md:h-5 md:w-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-foreground text-sm font-semibold md:text-base">
                            {format(log.dateLogs, "EEEE, MMMM dd")}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {format(log.dateLogs, "yyyy")}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5 font-semibold"
                        >
                          <Clock className="mr-1.5 h-3 w-3" />
                          {log.hoursLog} {log.hoursLog === 1 ? "hour" : "hours"}
                        </Badge>
                      </div>
                    </div>
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
