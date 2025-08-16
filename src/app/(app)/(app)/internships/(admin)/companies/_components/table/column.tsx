import type { ColumnDef } from "@tanstack/react-table";
import type { CompanySchema } from "./column-schema";
import { User2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/table/table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

export const CompaniesColumns: ColumnDef<CompanySchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-6">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
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
    accessorKey: "companyName",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Company Name" />
      </div>
    ),
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
];
