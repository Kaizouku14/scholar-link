"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ROLES } from "@/constants/roles";
import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import z from "zod";

export const AccountTableSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(), //Replace with enum
});

export type Accounts = z.infer<typeof AccountTableSchema>;

export const AccountColumns: ColumnDef<Accounts>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
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
    //TODO: Hide ID
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row, table }) => <Ellipsis className="ml-1.5 h-4 w-4" />,
  },
];
