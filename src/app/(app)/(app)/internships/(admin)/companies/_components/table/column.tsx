import type { ColumnDef } from "@tanstack/react-table";
import type { CompanySchema } from "./column-schema";
import { User2 } from "lucide-react";

export const CompaniesColumns: ColumnDef<CompanySchema>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "contactPersonEmail",
    header: "Contact Email",
  },
  {
    accessorKey: "contactPersonNo",
    header: "Contact No.",
  },
  {
    accessorKey: "internCount",
    header: "Active Interns",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <User2 className="text-muted-foreground mr-1 h-4 w-4" />
          <span>{row.original.internCount}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
