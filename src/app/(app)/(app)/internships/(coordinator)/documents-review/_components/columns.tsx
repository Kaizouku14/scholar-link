"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { type ColumnSchema } from "./column-schema";

export const DocumentReviewColumns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "documentType",
    header: "Document",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.documentType}</span>
      </div>
    ),
  },
  {
    accessorKey: "documentUrl",
  },
  {
    accessorKey: "reviewStatus",
    header: "Status",
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "name",
  },
  {
    accessorKey: "profileKey",
  },
  {
    accessorKey: "section",
  },
  {
    accessorKey: "course",
  },
  {
    id: "actions",
    header: "Actions",
  },
];
