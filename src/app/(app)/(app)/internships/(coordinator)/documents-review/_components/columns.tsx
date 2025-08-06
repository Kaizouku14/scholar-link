"use client";

import type { internDocuments } from "@/server/db/schema/internship";
import type { ColumnDef } from "@tanstack/react-table";
import type { InferSelectModel } from "drizzle-orm";

type documentsReview = InferSelectModel<typeof internDocuments>;

//TODO: FIX THE TYPE

export const DocumentReviewColumns: ColumnDef<documentsReview>[] = [
  {
    accessorKey: "documentType",
    header: "Document",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return row.original.documentType;
    },
  },
  {
    accessorKey: "student",
    header: "Student",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
  },
  {
    accessorKey: "reviewStatus",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
  },
];
