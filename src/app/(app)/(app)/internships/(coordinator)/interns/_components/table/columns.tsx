"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { InternColumn } from "./column-schema";

export const InternsColumns: ColumnDef<InternColumn>[] = [
  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "supervisor",
    header: "Supervisor",
  },
  {
    accessorKey: "supervisorEmail",
    header: "Supervisor Email",
  },
  {
    accessorKey: "studentCount",
    header: "Students",
  },
  {
    accessorKey: "totalProgressHours",
    header: "Progress",
  },
];
