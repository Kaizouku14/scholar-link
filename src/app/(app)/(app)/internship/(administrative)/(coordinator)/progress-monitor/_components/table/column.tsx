"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { COURSE_LABELS } from "@/constants/users/courses";
import {
  cn,
  getStatusColor,
  getStatusIcon,
  getStatusVariant,
} from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnSchema } from "./column-schema";
import { Progress } from "@/components/ui/progress";
import { DataTableRowActions } from "./table-row-actions";
import React from "react";

export const ProgressMonitoringColumns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "section",
    filterFn: (row, columnId, filterValues: string[]) => {
      const cellValue = row.getValue<string[]>(columnId) ?? [];
      return filterValues.some((val) => cellValue.includes(val));
    },
  },
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const { name, course, section, profile } = row.original;

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
              {name}
            </div>

            <div className="text-muted-foreground text-xs">
              {COURSE_LABELS[course!]} · {section}
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
      <div className="text-sm" title={row.original.companyName!}>
        {row.original.companyName}
      </div>
    ),
  },
  {
    accessorKey: "hours",
    header: "Hours",
    cell: ({ row }) => {
      const { logs, totalRequiredHours } = row.original;
      const totalHours = logs.reduce((acc, log) => acc + log.hours, 0);

      return (
        <div className="flex items-center text-sm">
          <span>{totalHours}</span>/
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
      const color = getStatusColor(status ?? "");
      const variant = getStatusVariant(status ?? "");

      return (
        <Badge
          variant={variant}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
            color,
          )}
        >
          {React.createElement(getStatusIcon(status ?? "default"), {
            className: cn(color),
          })}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const { logs, totalRequiredHours } = row.original;
      const totalHours = logs.reduce((acc, log) => acc + log.hours, 0);
      const progressNum = Number(totalHours) || 0;
      const totalHoursNum = Number(totalRequiredHours) || 0;
      const percentage =
        totalHoursNum > 0
          ? Number(((progressNum / totalHoursNum) * 100).toFixed(1))
          : 0;

      return (
        <div className="flex w-24 items-center gap-2">
          <Progress value={percentage} />
          <span className="text-muted-foreground">{percentage}%</span>
        </div>
      );
    },
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
