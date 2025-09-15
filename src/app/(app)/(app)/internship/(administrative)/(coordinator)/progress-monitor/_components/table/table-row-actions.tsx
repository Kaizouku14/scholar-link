"use client";

import type { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Clock, Eye, ClipboardCheck } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import type {
  ProgressLogs,
  progressMonitoring,
} from "@/interfaces/internship/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

interface DataTableRowActionsProps {
  row: Row<progressMonitoring>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { mutateAsync: MarkAsExcused } =
    api.internshipCoordinator.markStudenAsExcused.useMutation();
  const { refetch } =
    api.internshipCoordinator.getAllStudentProgressByDept.useQuery(undefined, {
      enabled: false,
    });
  const { id, logs, name } = row.original;

  const handleMarkAsExcused = async () => {
    const toastId = toast.loading("Marking as excused...");
    try {
      await MarkAsExcused({ internshipId: id });
      toast.success("Internship marked as excused!", { id: toastId });
      await refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const firstLog = logs.reduce(
    (earliest, log) => (!earliest || log.date < earliest.date ? log : earliest),
    null as ProgressLogs | null,
  );

  const logForDay = logs.find(
    (log: ProgressLogs) =>
      new Date(log.date * 1000).toDateString() === new Date().toDateString(),
  );

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Eye className="h-4 w-4" />
            <span className="ml-1">View logs</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{name}&apos;s Progress Logs</DialogTitle>
            <DialogDescription>
              View logs and activities by clicking the days.
            </DialogDescription>
          </DialogHeader>

          <Calendar
            mode="single"
            selected={undefined}
            className="w-full"
            modifiers={{
              logged: logs.map(
                (log: ProgressLogs) => new Date(log.date * 1000),
              ),
            }}
            components={{
              Day: ({ day }) => {
                const date = day.date;
                const logForDay = logs
                  .filter((log: ProgressLogs) => log.hours > 0)
                  .find(
                    (log: ProgressLogs) =>
                      new Date(log.date * 1000).toDateString() ===
                      date.toDateString(),
                  );
                const isToday =
                  date.toDateString() === new Date().toDateString();
                const isFirstLog =
                  logForDay &&
                  firstLog &&
                  Number(logForDay.date) === Number(firstLog.date);

                if (logForDay) {
                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <td
                          className={`ml-3 flex w-full cursor-pointer items-center rounded text-white ${
                            isFirstLog
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-green-600 hover:bg-green-700"
                          } data-[state=open]:border-2 data-[state=open]:border-white`}
                        >
                          <span className="w-12.5 p-2">
                            {day.date.getDate()}
                          </span>
                        </td>
                      </PopoverTrigger>

                      <PopoverContent className="border-0 p-0 md:w-80">
                        <div className="bg-card border-border overflow-hidden rounded-lg border">
                          <div className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-r p-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5" />
                              <div>
                                <h3 className="font-semibold">Progress Log</h3>
                                {isFirstLog && (
                                  <p className="text-primary-foreground/80 text-sm">
                                    Start of Internship
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="bg-card space-y-4 p-4">
                            {logForDay.hours > 0 && (
                              <>
                                <div>
                                  <h4 className="text-card-foreground mb-2 text-sm font-medium">
                                    Today&apos;s Activity
                                  </h4>
                                  <p className="text-muted-foreground bg-muted line-clamp-4 max-h-24 rounded-lg p-3 text-sm leading-relaxed">
                                    {logForDay.activity}
                                  </p>
                                </div>

                                <div className="bg-primary/5 border-primary/20 flex items-center justify-between rounded-lg border p-3">
                                  <span className="text-card-foreground text-sm font-medium">
                                    Hours Completed
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <div className="bg-primary rounded-full p-1">
                                      <Clock className="text-primary-foreground h-3 w-3" />
                                    </div>
                                    <span className="text-primary text-lg font-bold">
                                      {logForDay.hours}h
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }

                return (
                  <td
                    className={`${
                      day.outside ? "text-muted-foreground" : "text-foreground"
                    } ml-3 w-full rounded p-2 ${isToday && "border-border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs"}`}
                  >
                    {day.date.getDate()}
                  </td>
                );
              },
            }}
          />
        </DialogContent>
      </Dialog>
      {!logForDay && logs.length > 1 && (
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <ClipboardCheck className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as excused absence</p>
            </TooltipContent>
          </Tooltip>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Mark Excused Absence</AlertDialogTitle>
              <AlertDialogDescription>
                Mark {format(new Date(), "MMM, dd")} as an excused absence for{" "}
                {name}. Once marked as excused, the student will not be able to
                log progress for this day.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleMarkAsExcused}
              >
                Mark as Excused
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
