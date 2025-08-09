"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { COURSE_LABELS, type courseType } from "@/constants/courses";
import type { internshipStatusType } from "@/constants/status";
import { YEAR_LEVEL_LABELS, type YearLevelType } from "@/constants/year-level";
import { cn, getStatusColor, getStatusVariant } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Clock, Hourglass, XCircle } from "lucide-react";
import type { ColumnSchema } from "./column-schema";
import { Progress } from "@/components/ui/progress";
import { DataTableRowActions } from "./table-row-actions";

export const ProgressMonitoringColumns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "surname",
    header: "Student",
    cell: ({ row }) => {
      const { name, surname, course, section, yearLevel, profile } =
        row.original;

      return (
        <div className="flex items-center gap-x-1.5">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile ?? undefined} />
            <AvatarFallback className="text-sm">
              {name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <div className="text-foreground text-sm leading-tight font-medium">
              {name} {surname}
            </div>

            <div className="text-muted-foreground text-xs">
              {COURSE_LABELS[course as courseType]} ·{" "}
              {YEAR_LEVEL_LABELS[yearLevel as YearLevelType]}
              {section}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => (
      <div className="w-20 truncate text-base" title={row.original.companyName}>
        {row.original.companyName}
      </div>
    ),
  },
  {
    accessorKey: "hours",
    header: "Hours",
    cell: ({ row }) => {
      const { progress, totalRequiredHours } = row.original;
      return (
        <div className="flex items-center text-sm">
          <span>{progress}</span>/
          <span className="text-muted-foreground">{totalRequiredHours}hrs</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      const color = getStatusColor(status as internshipStatusType);
      const variant = getStatusVariant(status as internshipStatusType);

      return (
        <Badge
          variant={variant}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
            color,
          )}
        >
          {status === "pending" ? (
            <Clock className={cn("h-4 w-4", color)} />
          ) : status === "in-progress" ? (
            <Hourglass className={cn("h-4 w-4", color)} />
          ) : status === "completed" ? (
            <CheckCircle className={cn("h-4 w-4", color)} />
          ) : (
            <XCircle className={cn("h-4 w-4", color)} />
          )}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const { progress, totalRequiredHours } = row.original;
      const progressNum = Number(progress) || 0;
      const totalHoursNum = Number(totalRequiredHours) || 0;
      const percentage =
        totalHoursNum > 0
          ? Number(((progressNum / totalHoursNum) * 100).toFixed(1))
          : 0;

      return (
        <div className="flex items-center gap-2">
          <Progress value={percentage} />
          <span className="text-muted-foreground">{percentage}%</span>
        </div>
      );
    },
  },
  {
    id: "Actions",
    cell: ({ row, table }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
