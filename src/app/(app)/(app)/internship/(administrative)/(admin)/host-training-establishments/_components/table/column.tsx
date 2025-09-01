import type { ColumnDef } from "@tanstack/react-table";
import type { CompanySchema } from "./column-schema";
import { Building2, Mail, MapPin, Phone, UserCheck, Users } from "lucide-react";
import { DataTableColumnHeader } from "@/components/table/table-column-header";
import { DataTableRowActions } from "./table-row-actions";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  getStatusColor,
  getStatusVariant,
  cn,
  getStatusIcon,
} from "@/lib/utils";

export const CompaniesColumns: ColumnDef<CompanySchema>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Host Training Establishments"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Building2 className="text-muted-foreground h-4 w-4" />
        <div
          className="max-w-[10rem] truncate font-medium"
          title={row.original.companyName ?? "N/A"}
        >
          {row.original.companyName ?? "N/A"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="flex items-start space-x-2">
        <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
        <div
          className="text-muted-foreground max-w-[10rem] truncate text-sm"
          title={row.original.address ?? "No address provided"}
        >
          {row.original.address ?? "No address"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "supervisor",
    header: "Superivsor",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <UserCheck className="text-muted-foreground h-4 w-4" />
        <div
          className="max-w-[8rem] truncate font-medium"
          title={row.original.supervisor ?? "Not assigned"}
        >
          {row.original.supervisor ?? "Not assigned"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "supervisorEmail",
    header: "Superivsor Email",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Mail className="text-muted-foreground h-4 w-4" />
        {row.original.supervisorEmail ? (
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
    accessorKey: "supervisorNo",
    header: "Superivsor No.",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Phone className="text-muted-foreground h-4 w-4" />
        {row.original.supervisorNo ? (
          <a
            href={`tel:${row.original.supervisorNo}`}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {row.original.supervisorNo}
          </a>
        ) : (
          <span className="text-muted-foreground text-sm">No phone</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "studentCount",
    header: "Interns",
    cell: ({ row }) => {
      const count = row.original.studentCount;
      return (
        <div className="flex items-center space-x-2">
          <div
            className={`bg-primary/10 flex items-center space-x-1 rounded-full px-2 py-2 text-xs font-medium`}
          >
            <Users className="text-primary h-3 w-3" />
          </div>
          <span>{count}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    accessorFn: (row) => {
      const noOfIntern = row.interns.length;
      const statuses = row.interns.map((intern) => intern.status);
      const noOfCompleted = statuses.filter((s) => s === "completed").length;
      const noOfPending = statuses.filter((s) => s === "pending").length;
      const status =
        noOfCompleted === noOfIntern
          ? "completed"
          : noOfPending === noOfIntern
            ? "pending"
            : "on-going";

      return status;
    },
    cell: ({ row }) => {
      const { interns } = row.original;
      const noOfIntern = interns.length;
      const statuses = interns.map((intern) => intern.status);
      const noOfCompleted = statuses.filter((s) => s === "completed").length;
      const noOfPending = statuses.filter((s) => s === "pending").length;
      const status =
        noOfCompleted === noOfIntern
          ? "completed"
          : noOfPending === noOfIntern
            ? "pending"
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
          {React.createElement(getStatusIcon(status), {
            className: cn(color),
          })}
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "Actions",
    header: "",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
