"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DOCUMENT_LABELS } from "@/constants/documents";
import { calculateDaysLeft, cn, isDeadlineApproaching } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Calendar, FileText } from "lucide-react";

const UpcomingDeadlines = () => {
  const { data: internshipDocuments } =
    api.internships.getAllUpcomingDeadlines.useQuery();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-1 font-bold tracking-tight">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 flex h-11 w-11 items-center justify-center rounded-full">
              <Calendar className="text-primary h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-foreground text-xl leading-tight font-semibold">
                Upcoming Deadlines
              </h2>
              <p className="text-muted-foreground m-0 p-0 text-sm">
                Important dates to remember
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-full pt-0">
        {!internshipDocuments || internshipDocuments.length === 0 ? (
          <div className="flex h-full items-center justify-center gap-2">
            <div className="text-muted-foreground text-sm">
              No Upcoming Deadlines.
            </div>
          </div>
        ) : (
          <ScrollArea className="border-border h-50 rounded-xl border p-2">
            {internshipDocuments?.map((doc, index) => {
              const daysLeft = calculateDaysLeft(doc.deadline);
              const isApproaching = isDeadlineApproaching(doc.deadline);

              return (
                <div
                  key={index}
                  className="group border-border dark:bg-muted flex items-center gap-3 rounded-xl border bg-white p-2"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 transition group-hover:scale-105 dark:bg-green-900/40">
                    <FileText className="h-5 w-5 text-green-700 dark:text-green-300" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-foreground text-sm font-semibold">
                      {DOCUMENT_LABELS[doc.name]}
                    </span>

                    <span className="text-muted-foreground text-xs">
                      {doc.deadline.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      •{" "}
                      <span
                        className={cn(
                          "font-semibold",
                          isApproaching
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {Math.abs(daysLeft)} day
                        {Math.abs(daysLeft) !== 1 ? "s" : ""} left
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
