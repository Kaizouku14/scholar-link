"use client";

import type { CoordinatorSectionData } from "@/interfaces/internship/hei";
import type { ColumnDef } from "@tanstack/react-table";
import { cn, getStatusColor, getStatusIcon } from "@/lib/utils";
import React from "react";
import { Building2, GraduationCap, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "./table-row-actions";
import { DataTableColumnHeader } from "@/components/table/table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YEAR_LEVEL_LABELS } from "@/constants/users/year-level";

export const CoordinatorInternsColumns: ColumnDef<CoordinatorSectionData>[] = [
  {
    accessorKey: "surname",
    header: "Student",
    cell: ({ row }) => {
      const { name, middleName, surname, profile } = row.original;

      return (
        <div className="flex items-center gap-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile ?? undefined} />
            <AvatarFallback className="text-sm">
              {name?.charAt(0)?.toUpperCase()}
              {surname?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <div className="text-foreground text-sm font-medium">
              {surname}, {name}{" "}
              {middleName && `${middleName.charAt(0).toUpperCase()}.`}
            </div>
            <div className="text-muted-foreground text-xs">
              {row.original.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "section",
    header: ({ column }) => (
      <div className="text-left">
        <DataTableColumnHeader column={column} title="Section" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="text-muted-foreground h-4 w-4 flex-shrink-0" />
          <span className="max-w-[200px] truncate tracking-wide">
            {row.original.course}
          </span>
        </div>
        <div className="text-muted-foreground flex max-w-[200px] gap-1 truncate pl-5 text-xs">
          <span>SECTION</span>·
          <span>
            {YEAR_LEVEL_LABELS[row.original.yearLevel!]}
            {row.original.section}
          </span>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <Building2 className="text-muted-foreground h-4 w-4 flex-shrink-0" />
          <span className="text-sm font-medium">
            {row.original.companyName ?? "Not assigned"}
          </span>
        </div>
        {row.original.companyAddress && (
          <div className="text-muted-foreground max-w-[200px] truncate pl-5 text-xs">
            {row.original.companyAddress}
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "supervisorName",
    header: "Supervisor",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        {row.original.supervisorName ? (
          <>
            <div className="flex items-center gap-1.5">
              <UserCheck className="text-muted-foreground h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">
                {row.original.supervisorName}
              </span>
            </div>
            <div className="text-muted-foreground pl-5 text-xs">
              {row.original.supervisorEmail}
            </div>
          </>
        ) : (
          <span className="text-muted-foreground text-sm">Not assigned</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "supervisorContactNo",
    header: "Supervisor No.",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.supervisorContactNo}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const color = getStatusColor(status);

      return (
        <Badge
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium capitalize",
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
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
