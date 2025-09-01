"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { type DocumentSchema } from "./column-schema";
import { FileText } from "lucide-react";
import { COURSE_LABELS } from "@/constants/users/courses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  cn,
  formatText,
  getStatusColor,
  getStatusIcon,
  getStatusVariant,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableRowActions } from "./table-row-actions";
import React from "react";

export const DocumentReviewColumns: ColumnDef<DocumentSchema>[] = [
  {
    accessorKey: "documentType",
    header: "Document",
    cell: ({ row }) => (
      <Button
        title={row.original.documentType}
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
            <span className="text-foreground max-w-40 truncate text-sm font-semibold">
              {formatText(row.original.documentType)}
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
    accessorKey: "section",
    filterFn: (row, columnId, filterValues: string[]) => {
      const cellValue = row.getValue<string[]>(columnId) ?? [];
      return filterValues.some((val) => cellValue.includes(val));
    },
  },
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const { name, course, section, profile } = row.original;

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
              {name}
            </div>

            <div className="text-muted-foreground text-xs">
              {COURSE_LABELS[course!]} · {section?.[0]}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: "Host Training Establishments",
    cell: ({ row }) => (
      <div
        className="max-w-[15rem] truncate text-base"
        title={row.original.companyName!}
      >
        {row.original.companyName}
      </div>
    ),
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) => (
      <div className="text-sm">
        {format(new Date(row.original.submittedAt!), "MMM dd, yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "reviewStatus",
    header: "Status",
    cell: ({ row }) => {
      const { reviewStatus } = row.original;
      const color = getStatusColor(reviewStatus ?? "default");
      const variant = getStatusVariant(reviewStatus ?? "default");

      return (
        <Badge
          variant={variant}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
            color,
          )}
        >
          {React.createElement(getStatusIcon(reviewStatus ?? "default"), {
            className: cn(color),
          })}
          {reviewStatus}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
