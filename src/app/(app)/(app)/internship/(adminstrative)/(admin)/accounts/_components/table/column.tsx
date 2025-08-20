"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { IdCard } from "lucide-react";
import type { AccountSchema } from "./column-schema";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSE_LABELS, type courseType } from "@/constants/users/courses";
import {
  YEAR_LEVEL_LABELS,
  type YearLevelType,
} from "@/constants/users/year-level";
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
              {surname}, {name} {middleName?.charAt(0).toUpperCase()}.
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
    header: "User Role",
    cell: ({ row }) => {
      const { role } = row.original as {
        role: "internshipStudent" | "internshipCoordinator" | "internshipAdmin";
      };
      const roleColors = {
        internshipStudent: "bg-blue-100 text-blue-800",
        internshipCoordinator: "bg-green-100 text-green-800",
        internshipAdmin: "bg-primary text-white",
      };

      return (
        <Badge
          className={
            role ? `${roleColors[role]} px-2 py-1` : "bg-gray-100 text-gray-800"
          }
        >
          {role === "internshipStudent" && " Student"}
          {role === "internshipCoordinator" && " Coordinator"}
          {role === "internshipAdmin" && " Admin"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Email Verified",
    cell: ({ row }) => {
      const { status } = row.original as {
        status: "verified" | "revoked";
      };

      return (
        <div
          className={`${status === "verified" ? "text-green-600" : "text-primary"} px-2 py-1`}
        >
          {status === "verified" && (
            <div className="flex items-center gap-x-1">
              <span>Verified</span>
            </div>
          )}
          {status === "revoked" && (
            <div className="flex items-center gap-x-1">
              <span>Not Verified</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
