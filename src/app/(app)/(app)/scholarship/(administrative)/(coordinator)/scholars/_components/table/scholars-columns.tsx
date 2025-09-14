"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSE_LABELS } from "@/constants/users/courses";
import { YEAR_LEVEL_LABELS } from "@/constants/users/year-level";
import {
  cn,
  getStatusColor,
  getStatusIcon,
  getStatusVariant,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { IdCard, Phone } from "lucide-react";
import type { ProgramScholars } from "@/interfaces/scholarship/scholars";
import { DataTableRowActions } from "./table-row-actions";

export const ScholarsColumns: ColumnDef<ProgramScholars>[] = [
  {
    accessorKey: "studentNo",
    header: "Student No.",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1.5">
          <IdCard className="h-4 w-4" />
          <span className="text-foreground text-sm leading-tight font-medium">
            {row.original.studentNo}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: (header) => (
      <div className="text-left">
        <DataTableColumnHeader
          column={header.column}
          title="Applicant"
          enableHiding={false}
        />
      </div>
    ),
    cell: ({ row }) => {
      const { name, profile, course, section, yearLevel } = row.original;
      return (
        <div className="relative flex items-center gap-x-1.5">
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
              {COURSE_LABELS[course]} · {YEAR_LEVEL_LABELS[yearLevel]}
              {section}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "programName",
    header: "Program",
    cell: ({ row }) => (
      <div title={row.original.programName} className="max-w-[10rem] truncate">
        {row.original.programName}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "contact",
    header: "Contact No.",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Phone className="text-muted-foreground h-4 w-4 flex-shrink-0" />
        <a
          href={`tel:${row.original.contact}`}
          className="py-0 text-blue-500 hover:text-blue-800 hover:underline"
        >
          {row.original.contact}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "year",
    accessorFn: (row) => new Date(row.updatedAt).getFullYear().toString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
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
          {React.createElement(getStatusIcon(status) ?? "div", {
            className: cn(color),
          })}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
