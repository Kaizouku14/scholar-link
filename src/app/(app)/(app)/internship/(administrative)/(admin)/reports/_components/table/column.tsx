"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ReportSchema } from "./column-schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSE_LABELS } from "@/constants/users/courses";
import { Mail, MapPin, Phone } from "lucide-react";

export const ReportsColumn: ColumnDef<ReportSchema>[] = [
  {
    accessorKey: "studentNo",
    header: "Student No.",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("studentNo")}</div>
    ),
  },
  {
    accessorKey: "studentName",
    header: "Student",
    cell: ({ row }) => {
      const { studentName, course, section, profile } = row.original;

      return (
        <div className="flex items-center gap-x-1.5">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile ?? undefined} />
            <AvatarFallback className="text-sm">
              {studentName?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <div className="text-foreground text-sm leading-tight font-medium">
              {studentName}
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
    accessorKey: "studentEmail",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[10rem] truncate text-sm">
        {row.getValue("studentEmail")}
      </div>
    ),
  },
  {
    accessorKey: "contactNo",
    header: "Contact",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("contactNo")}</div>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => <div className="text-sm">{row.getValue("sex")}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="text-sm font-medium">{row.getValue("department")}</div>
    ),
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
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("company")}</div>
    ),
  },
  {
    accessorKey: "companyAddress",
    header: "Company Address",
    cell: ({ row }) => (
      <div className="flex items-start space-x-2">
        <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
        <div
          className="text-muted-foreground max-w-[10rem] truncate text-sm"
          title={row.original.companyAddress ?? "No address provided"}
        >
          {row.original.companyAddress ?? "No address"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "supervisorName",
    header: "Supervisor",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("supervisorName")}</div>
    ),
  },
  {
    accessorKey: "supervisorEmail",
    header: "Supervisor Email",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Mail className="text-muted-foreground h-4 w-4" />
        {row.getValue("supervisorEmail") ? (
          <a
            href={`mailto:${row.original.supervisorEmail}`}
            className="w-40 truncate text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {row.original.supervisorEmail}
          </a>
        ) : (
          <span className="text-muted-foreground text-sm">No email</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "supervisorContactNo",
    header: "Supervisor Contact",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Phone className="text-muted-foreground h-4 w-4" />
        {row.getValue("supervisorContactNo") ? (
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
];
