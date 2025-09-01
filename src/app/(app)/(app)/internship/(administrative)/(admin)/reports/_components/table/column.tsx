"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ReportSchema } from "./column-schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone } from "lucide-react";

export const ReportsColumn: ColumnDef<ReportSchema>[] = [
  {
    accessorKey: "company",
    header: "HTEs",
    cell: ({ row }) => (
      <div
        className="max-w-[10rem] truncate font-medium"
        title={row.getValue("company")}
      >
        {row.getValue("company")}
      </div>
    ),
  },
  {
    accessorKey: "studentName",
    header: "Student",
    cell: ({ row }) => {
      const { studentName, profile } = row.original;

      return (
        <div className="flex items-center gap-x-1.5">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile ?? undefined} />
            <AvatarFallback className="text-sm">
              {studentName?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-foreground text-sm leading-tight font-medium">
            {studentName}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "course",
    header: "Program Enrolled",
    cell: ({ row }) => <div className="text-sm">{row.getValue("course")}</div>,
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => <div className="text-sm">{row.getValue("sex")}</div>,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div
        className="max-w-[12rem] truncate text-sm"
        title={row.getValue("duration")}
      >
        {row.getValue("duration")}
      </div>
    ),
  },
  {
    accessorKey: "supervisorContactNo",
    header: "Contact Info of CT",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Phone className="text-muted-foreground h-4 w-4" />
        {row.getValue("supervisorContactNo") ? (
          <a
            href={`tel:${row.original.supervisorContactNo}`}
            className="font-mono text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {row.original.supervisorContactNo}
          </a>
        ) : (
          <span className="text-muted-foreground text-sm">No phone</span>
        )}
      </div>
    ),
  },
];
