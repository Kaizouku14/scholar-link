"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { COURSE_LABELS } from "@/constants/users/courses";
import { YEAR_LEVEL_LABELS } from "@/constants/users/year-level";
import {
  cn,
  getStatusColor,
  getStatusIcon,
  getStatusVariant,
} from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Clock, Hourglass, XCircle } from "lucide-react";
import type { ColumnSchema } from "./column-schema";
import { Progress } from "@/components/ui/progress";
import { DataTableRowActions } from "./table-row-actions";
import React from "react";

export const ProgressMonitoringColumns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "surname",
    header: "Student",
    cell: ({ row }) => {
      const { name, middleName, surname, course, section, yearLevel, profile } =
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
              {surname}, {name} {middleName?.charAt(0).toUpperCase()}.
            </div>

            <div className="text-muted-foreground text-xs">
              {COURSE_LABELS[course!]} · {YEAR_LEVEL_LABELS[yearLevel!]}
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
      <div className="w-20 truncate text-sm" title={row.original.companyName}>
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
      const { progress, totalRequiredHours } = row.original;
      const progressNum = Number(progress) || 0;
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
