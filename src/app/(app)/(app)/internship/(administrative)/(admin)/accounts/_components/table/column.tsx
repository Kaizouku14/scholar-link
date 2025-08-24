"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { AccountSchema } from "./column-schema";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableRowActions } from "./table-row-actions";
import { ROLE } from "@/constants/users/roles";

export const AccountColumns: ColumnDef<AccountSchema>[] = [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const { name, profile } = row.original;

      return (
        <div className="flex items-center gap-x-1.5">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile ?? undefined} />
            <AvatarFallback className="text-sm">
              {name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-foreground text-sm leading-tight font-medium">
            {name}
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
          {role === ROLE.INTERNSHIP_STUDENT && " Student"}
          {role === ROLE.INTERNSHIP_COORDINATOR && " Coordinator"}
          {role === ROLE.INTERNSHIP_ADMIN && " Admin"}
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
