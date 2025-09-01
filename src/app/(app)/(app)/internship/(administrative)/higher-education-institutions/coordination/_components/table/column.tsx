"use client";

import type { CoordinatorSectionData } from "@/interfaces/internship/hei";
import type { ColumnDef } from "@tanstack/react-table";
import { cn, getStatusColor, getStatusIcon } from "@/lib/utils";
import React from "react";
import { Building2, GraduationCap, Phone, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/table/table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./data-row-actions";

export const CoordinatorInternsColumns: ColumnDef<CoordinatorSectionData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mr-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const { name, profile } = row.original;

      return (
        <div className="flex items-center gap-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile ?? undefined} />
            <AvatarFallback className="text-sm">
              {name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <div className="text-foreground text-sm font-medium">{name}</div>
            <div className="text-muted-foreground w-30 truncate text-xs">
              {row.original.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "section",
    filterFn: (row, columnId, filterValues: string[]) => {
      const cellValue = row.getValue<string[]>(columnId) ?? [];
      return filterValues.some((val) => cellValue.includes(val));
    },
    header: ({ column }) => (
      <div className="text-left">
        <DataTableColumnHeader column={column} title="Section" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="text-muted-foreground h-4 w-4 flex-shrink-0" />
          <span className="max-w-[150px] truncate tracking-wide">
            {row.original.course}
          </span>
        </div>
        <div className="text-muted-foreground flex max-w-[150px] gap-1 truncate pl-5 text-xs">
          <span>SECTION</span>·<span>{row.original.section}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
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
            <a
              href={`mailto:${row.original.supervisorEmail}`}
              className="w-30 truncate py-0 pl-5 text-xs text-blue-500 hover:text-blue-800 hover:underline"
            >
              {row.original.supervisorEmail}
            </a>
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
      <div className="flex items-center space-x-2">
        <Phone className="text-muted-foreground h-4 w-4" />
        {row.original.supervisorContactNo ? (
          <a
            href={`tel:${row.original.supervisorContactNo}`}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {row.original.supervisorContactNo}
          </a>
        ) : (
          <span className="text-muted-foreground text-sm">No phone</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const selected = table.getSelectedRowModel().rows.length > 0;
      return <DataTableRowActions row={row} disabled={selected} />;
    },
  },
];
