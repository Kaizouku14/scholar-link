"use client";

import type { AdminSectionData } from "@/interfaces/internship/hei";
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
import { Building, Clock, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "./table-row-actions";

export const AdminInternsColumns: ColumnDef<AdminSectionData>[] = [
  {
    accessorKey: "course",
    header: ({ column }) => (
      <div className="text-left">
        <DataTableColumnHeader column={column} title="Section" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <div className="bg-primary h-2 w-2 rounded-full" />
          <span className="text-primary text-xs font-medium tracking-wider uppercase">
            {row.original.course}
          </span>
        </div>
        <div className="flex items-center gap-2 pl-3.5">
          <span className="text-sm tracking-wide">
            SECTION {row.original.section}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="flex items-center overflow-hidden whitespace-nowrap">
        <Building className="text-muted-foreground mr-1.5 h-4 w-4 flex-shrink-0" />
        <span className="max-w-[120px] truncate">
          {row.original.department}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "hoursRequired",
    header: "Hours Required",
    cell: ({ row }) => {
      const department = row.original.department!;
      const hoursRequired = departmentHoursMap[department];
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
      <div className="flex items-center gap-1.5">
        <Users className="text-muted-foreground h-4 w-4" />
        <span className="font-medium">{row.original.studentCount}</span>
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
