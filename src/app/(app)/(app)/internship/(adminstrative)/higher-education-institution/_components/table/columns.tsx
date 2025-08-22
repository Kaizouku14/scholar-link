"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { InternColumn } from "./column-schema";
import { Building2, User2 } from "lucide-react";
import type { departmentType } from "@/constants/users/departments";
import { departmentHoursMap } from "@/constants/internship/hours";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  calculateCompletionPercentage,
  cn,
  getStatusColor,
  getStatusFromPercentage,
  getStatusIcon,
  getStatusVariant,
} from "@/lib/utils";
import { DataTableRowActions } from "./table-row-actions";
import { DataTableColumnHeader } from "@/components/table/table-column-header";
import React from "react";

export const InternsColumns: ColumnDef<InternColumn>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Company" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center overflow-hidden whitespace-nowrap">
        <Building2 className="text-muted-foreground mr-1.5 h-4 w-4 flex-shrink-0" />
        <span className="max-w-[80px] truncate">
          {row.original.companyName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="max-w-[10rem] truncate" title={row.original.address!}>
        {row.original.address}
      </div>
    ),
  },
  {
    accessorKey: "supervisor",
    header: "Supervisor",
  },
  {
    accessorKey: "supervisorEmail",
    header: "Supervisor Email",
  },
  {
    accessorKey: "hoursRequired",
    header: "Hours Required",
    cell: ({ row }) => {
      const department = row.original.department as departmentType;
      const hoursRequired = departmentHoursMap[department];
      return (
        <div className="flex items-center">
          <span>{hoursRequired}</span>
          <span className="text-muted-foreground">hrs</span>
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
        row.department as departmentType,
      );
      return getStatusFromPercentage(percentage);
    },
    cell: ({ row }) => {
      const { totalProgressHours, studentCount, department } = row.original;
      const percentage = calculateCompletionPercentage(
        Number(totalProgressHours),
        studentCount,
        department as departmentType,
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
      <div className="flex items-center">
        <User2 className="text-muted-foreground mr-2 h-4 w-4" />
        <span>{row.original.studentCount}</span>
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
        department as departmentType,
      );
      return (
        <div className="flex w-24 items-center gap-2">
          <Progress value={percentage} />
          <span className="text-muted-foreground">{percentage}%</span>
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
