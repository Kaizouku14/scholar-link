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
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Clock, Eye } from "lucide-react";
import type { ColumnSchema } from "./column-schema";
import { Calendar } from "@/components/ui/calendar";
import type { ProgressLogs } from "@/interfaces/internship/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableRowActionsProps {
  row: Row<ColumnSchema>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { logs, name } = row.original;

  return (
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
          <DialogDescription>Hover to see activity</DialogDescription>
        </DialogHeader>

        <Calendar
          mode="single"
          selected={undefined}
          className="w-full"
          modifiers={{
            logged: logs.map((log: ProgressLogs) => new Date(log.date * 1000)),
          }}
          components={{
            Day: ({ day }) => {
              const date = day.date;
              const logForDay = logs.find(
                (log: ProgressLogs) =>
                  new Date(log.date * 1000).toDateString() ===
                  date.toDateString(),
              );

              const outsideStyle = day.outside
                ? "text-muted-foreground"
                : "text-foreground";

              if (logForDay) {
                return (
                  <Popover>
                    <Tooltip>
                      <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                          <Button
                            {...day}
                            className="mr-3 cursor-pointer rounded bg-green-600 hover:bg-green-700 data-[state=open]:border-2 data-[state=open]:border-white"
                          >
                            {day.date.getDate()}
                          </Button>
                        </TooltipTrigger>
                      </PopoverTrigger>

                      <TooltipContent>
                        <p>{logForDay.activity}</p>
                      </TooltipContent>
                    </Tooltip>

                    <PopoverContent
                      side="right"
                      align="center"
                      className="fixed top-1/2 w-70 -translate-y-65 border-0 p-0 md:left-[calc(100%+23rem)] md:w-80"
                    >
                      <div className="bg-card border-border overflow-hidden rounded-lg border">
                        <div className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-r p-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <div>
                              <h3 className="font-semibold">Progress Log</h3>
                              <p className="text-primary-foreground/80 text-sm">
                                {new Date(
                                  logForDay.date * 1000,
                                ).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-card space-y-4 p-4">
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
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              }

              return (
                <div
                  className={`${outsideStyle} ml-3 w-full rounded p-2`}
                  {...day}
                >
                  {day.date.getDate()}
                </div>
              );
            },
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Mark as absent</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
