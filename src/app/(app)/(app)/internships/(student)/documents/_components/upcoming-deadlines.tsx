import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  calculateDaysLeft,
  cn,
  isDeadlineApproaching,
  isDeadlinePassed,
} from "@/lib/utils";
import { Calendar, FileText } from "lucide-react";

const UpcomingDeadlines = () => {
  const internshipDocuments = [
    {
      id: "doc-1",
      name: "Internship Contract / Agreement",
      submittedAt: new Date("2025-06-21"),
      deadline: new Date("2025-08-30"),
      daysLeft: 10,
      type: "contract",
      status: "pending", // or "approved", "rejected"
    },
    {
      id: "doc-2",
      name: "Memorandum of Agreement",
      submittedAt: new Date("2025-06-10"),
      deadline: new Date("2025-08-30"),
      daysLeft: 5,
      type: "moa",
      status: "approved",
    },
    {
      id: "doc-3",
      name: "Internship Monitoring Form",
      submittedAt: new Date("2025-07-01"),
      deadline: new Date("2025-08-04"),
      daysLeft: 30,
      type: "dtr",
      status: "rejected",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 font-bold tracking-tight">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 flex h-11 w-11 items-center justify-center rounded-full">
              <Calendar className="text-primary h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-foreground text-xl leading-tight font-semibold">
                Upcoming Deadlines
              </h2>
              <p className="text-muted-foreground text-sm">
                Important dates to remember
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {internshipDocuments.map((doc) => {
          const daysLeft = calculateDaysLeft(doc.deadline);
          const isApproaching = isDeadlineApproaching(doc.deadline);
          const isPassed = isDeadlinePassed(doc.deadline);

          return (
            <div
              key={doc.id}
              className="group border-border dark:bg-muted flex items-center gap-3 rounded-xl border bg-white p-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 transition group-hover:scale-105 dark:bg-green-900/40">
                <FileText className="h-5 w-5 text-green-700 dark:text-green-300" />
              </div>

              <div className="flex flex-col">
                <span className="text-foreground text-sm font-semibold">
                  {doc.name}
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
                      isPassed
                        ? "text-red-500"
                        : isApproaching
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-foreground",
                    )}
                  >
                    {Math.abs(daysLeft)} day
                    {Math.abs(daysLeft) !== 1 ? "s" : ""}{" "}
                    {isPassed ? "overdue" : "left"}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
