"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { InternColumn } from "./column-schema";
import {
  Building2,
  CheckCircle,
  Clock,
  Hourglass,
  User2,
  XCircle,
} from "lucide-react";
import type { departmentType } from "@/constants/users/departments";
import { departmentHoursMap } from "@/constants/internship/hours";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn, getStatusColor, getStatusVariant } from "@/lib/utils";
import { DataTableRowActions } from "./table-row-actions";
import { DataTableColumnHeader } from "@/components/table/table-column-header";

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
      const hoursRequired =
        departmentHoursMap[row.department as departmentType];
      const percentage =
        Number(row.totalProgressHours) > 0
          ? Number(
              (
                (Number(row.totalProgressHours) /
                  (row.studentCount * hoursRequired)) *
                100
              ).toFixed(1),
            )
          : 0;

      return percentage === 0
        ? "pending"
        : percentage >= 100
          ? "completed"
          : "on-going";
    },
    cell: ({ row }) => {
      const { totalProgressHours, studentCount, department } = row.original;
      const hoursRequired = departmentHoursMap[department as departmentType];
      const percentage =
        Number(totalProgressHours) > 0
          ? Number(
              (
                (Number(totalProgressHours) / (studentCount * hoursRequired)) *
                100
              ).toFixed(1),
            )
          : 0;

      const status =
        percentage === 0
          ? "pending"
          : percentage >= 100
            ? "completed"
            : "on-going";
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
          {status === "pending" ? (
            <Clock className={cn("h-4 w-4", color)} />
          ) : status === "on-going" ? (
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
      const hoursRequired = departmentHoursMap[department as departmentType];
      const percentage =
        Number(totalProgressHours) > 0
          ? Number(
              (
                (Number(totalProgressHours) / (studentCount * hoursRequired)) *
                100
              ).toFixed(1),
            )
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
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
