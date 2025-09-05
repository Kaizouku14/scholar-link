"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnSchema } from "./column-schema";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSE_LABELS } from "@/constants/users/courses";

export const MoaColumns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "documentUrl",
    header: "Memorandum of Agreement",
    cell: ({ row }) => (
      <Button
        title={row.original.documentUrl!}
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
              Memorandum of Agreement
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
    accessorKey: "name",
    header: "Name",
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
              {COURSE_LABELS[course!]} · {section}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "deparment",
    header: "Department",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Mail className="text-muted-foreground h-4 w-4" />
        {row.original.email ? (
          <a
            href={`mailto:${row.original.email}`}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {row.original.email}
          </a>
        ) : (
          <span className="text-muted-foreground text-sm">No email</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "contactNo",
    header: "Contact No.",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Phone className="text-muted-foreground h-4 w-4" />
        {row.original.contactNo ? (
          <a
            href={`tel:${row.original.contactNo}`}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            {row.original.contactNo}
          </a>
        ) : (
          <span className="text-muted-foreground text-sm">No phone</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "course",
  },
  {
    accessorKey: "section",
  },
];
