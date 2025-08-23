"use client";

import type { CoordinatorSectionData } from "@/interfaces/internship/hei";
import type { ColumnDef } from "@tanstack/react-table";
import { departmentHoursMap } from "@/constants/internship/hours";
import {
  calculateCompletionPercentage,
  cn,
  getStatusColor,
  getStatusFromPercentage,
  getStatusIcon,
  getStatusVariant,
} from "@/lib/utils";
import React from "react";
import { DataTableColumnHeader } from "@/components/table/table-column-header";
import { Clock, GraduationCap, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "./table-row-actions";

export const CoordinatorInternsColumns: ColumnDef<CoordinatorSectionData>[] = [
  {
    accessorKey: "section",
    header: ({ column }) => (
      <div className="text-left">
        <DataTableColumnHeader column={column} title="Section" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <GraduationCap className="text-muted-foreground h-4 w-4 flex-shrink-0" />
        <span className="font-bold tracking-wide">
          SECTION {row.original.section}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "hoursRequired",
    header: "Hours Required",
    cell: ({ row }) => {
      const hoursRequired = departmentHoursMap[row.original.department!];
      return (
        <div className="flex items-center gap-1">
          <Clock className="text-muted-foreground h-4 w-4" />
          <span>{hoursRequired}</span>
          <span className="text-muted-foreground text-xs">hrs</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    accessorFn: (row) => {
      const percentage = calculateCompletionPercentage(
        Number(row.totalProgressHours),
        row.studentCount,
        row.department!,
      );
      return getStatusFromPercentage(percentage);
    },
    cell: ({ row }) => {
      const { totalProgressHours, studentCount, department } = row.original;
      const percentage = calculateCompletionPercentage(
        Number(totalProgressHours),
        studentCount,
        department!,
      );

      const status = getStatusFromPercentage(percentage);
      const color = getStatusColor(status);
      const variant = getStatusVariant(status);
      return (
        <Badge
          variant={variant}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
            color,
          )}
        >
          {React.createElement(getStatusIcon(status), { className: cn(color) })}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "studentCount",
    header: "Students",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Users className="text-muted-foreground h-4 w-4" />
        <span className="font-medium">{row.original.studentCount}</span>
        <span className="text-muted-foreground text-xs">students</span>
      </div>
    ),
  },
  {
    accessorKey: "totalProgressHours",
    header: "Progress",
    cell: ({ row }) => {
      const { totalProgressHours, studentCount, department } = row.original;
      const percentage = calculateCompletionPercentage(
        Number(totalProgressHours),
        studentCount,
        department!,
      );
      return (
        <div className="flex w-32 items-center gap-2">
          <Progress value={percentage} className="h-2" />
          <span className="text-muted-foreground text-xs">{percentage}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
