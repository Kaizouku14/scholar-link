"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { type ColumnSchema } from "./column-schema";
import { DOCUMENT_LABELS } from "@/constants/documents";
import { CheckCircle, Clock, Eye, FileText, XCircle } from "lucide-react";
import { COURSE_LABELS, type courseType } from "@/constants/courses";
import { YEAR_LEVEL_LABELS, type YearLevelType } from "@/constants/year-level";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn, getStatusColor, getStatusVariant } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { statusType } from "@/constants/status";
import { Button } from "@/components/ui/button";
import { DataTableRowActions } from "./table-row-actions";

export const DocumentReviewColumns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "documentType",
    header: "Document",
    cell: ({ row }) => (
      <Button
        className="m-0 h-fit w-full cursor-pointer border-none p-0 shadow-none"
        variant={"outline"}
        onClick={() => {
          window.open(
            row.original.documentUrl!,
            "_blank",
            "noopener,noreferrer",
          );
        }}
      >
        <div className="border-border bg-muted/20 flex w-full items-start gap-3 rounded-md border p-3">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-md">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-foreground truncate text-sm font-semibold">
              {DOCUMENT_LABELS[row.original.documentType]}
            </span>
            <span className="text-muted-foreground text-start text-xs">
              Document
            </span>
          </div>
        </div>
      </Button>
    ),
  },
  {
    accessorKey: "Student",
    header: "Student",
    cell: ({ row }) => {
      const { name, surname, course, section, yearLevel, profile } =
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
              {name} {surname}
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
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => (
      <div className="w-20 truncate text-base" title={row.original.companyName}>
        {row.original.companyName}
      </div>
    ),
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) => (
      <div className="text-sm">
        {format(new Date(row.original.submittedAt as Date), "MMM dd, yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "reviewStatus",
    header: "Status",
    cell: ({ row }) => {
      const { reviewStatus } = row.original;
      const color = getStatusColor(reviewStatus as statusType);
      const variant = getStatusVariant(reviewStatus as statusType);

      return (
        <Badge
          variant={variant}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
            color,
          )}
        >
          {reviewStatus === "pending" ? (
            <Clock className={cn("h-4 w-4", color)} />
          ) : reviewStatus === "approved" ? (
            <CheckCircle className={cn("h-4 w-4", color)} />
          ) : (
            <XCircle className={cn("h-4 w-4", color)} />
          )}
          {reviewStatus}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      return <DataTableRowActions row={row} table={table} />;
    },
  },
];
