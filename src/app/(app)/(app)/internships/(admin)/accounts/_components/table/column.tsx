"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2Icon, Ellipsis, IdCard, XCircle } from "lucide-react";
import type { AccountSchema } from "./column-schema";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSE_LABELS, type courseType } from "@/constants/courses";
import { YEAR_LEVEL_LABELS, type YearLevelType } from "@/constants/year-level";
import { DataTableRowActions } from "./table-row-actions";

export const AccountColumns: ColumnDef<AccountSchema>[] = [
  {
    accessorKey: "studentNo",
    header: "Student No.",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IdCard className="text-muted-foreground" />
        {row.original.studentNo}
      </div>
    ),
  },
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
              {surname}, {name} {middleName}
            </div>

            <div className="text-muted-foreground text-xs">
              {COURSE_LABELS[course as courseType]} ·{" "}
              {YEAR_LEVEL_LABELS[yearLevel as YearLevelType]}
              {section}
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const { role } = row.original as {
        role: "internshipStudent" | "internshipCoordinator";
      };
      const roleColors = {
        internshipStudent: "bg-blue-100 text-blue-800",
        internshipCoordinator: "bg-green-100 text-green-800",
      };

      return (
        <Badge
          className={
            role ? `${roleColors[role]} px-2 py-1` : "bg-gray-100 text-gray-800"
          }
        >
          {role === "internshipStudent" && "Internship Student"}
          {role === "internshipCoordinator" && "Internship Coordinator"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original as {
        status: "verified" | "revoked";
      };
      const statusColors = {
        verified: "bg-green-100 text-green-800 py-1 px-2",
        revoked: "bg-primary text-white py-1 px-2",
      };

      return (
        <Badge
          className={
            status ? statusColors[status] : "bg-gray-100 text-gray-800"
          }
        >
          {status === "verified" && (
            <div className="flex items-center gap-x-1">
              <CheckCircle2Icon className="h-4 w-4 text-green-800" />
              <span>Verified</span>
            </div>
          )}
          {status === "revoked" && (
            <div className="flex items-center gap-x-1">
              <XCircle className="h-4 w-4 text-white" />
              <span>Revoked</span>
            </div>
          )}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
