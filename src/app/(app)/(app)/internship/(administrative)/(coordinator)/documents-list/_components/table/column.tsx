import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSE_LABELS, type courseType } from "@/constants/users/courses";
import {
  YEAR_LEVEL_LABELS,
  type YearLevelType,
} from "@/constants/users/year-level";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "./table-row-actions";
import type { StudentDocuments } from "@/interfaces/internship/document";

export const DocumentListColumns: ColumnDef<StudentDocuments>[] = [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const { name, course, section, yearLevel, profile } = row.original;

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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contactNo",
    header: "Contact No.",
  },
  {
    accessorKey: "status",
    header: "Status",
    accessorFn: (row) => {
      const documents = row.documents;
      const requiredDocs = row.requiredDocuments;
      const allSubmitted = requiredDocs.every((required) =>
        documents.some((doc) => doc.type === required.documentType),
      );
      const allCompleted = requiredDocs.every((required) =>
        documents.some(
          (doc) =>
            doc.type === required.documentType &&
            doc.reviewStatus === "completed",
        ),
      );
      const showCompleted = allSubmitted && allCompleted;
      return showCompleted ? "completed" : "pending";
    },
    cell: ({ row }) => {
      const { documents, requiredDocuments } = row.original;
      const requiredDocs = requiredDocuments;
      const allSubmitted = requiredDocs.every((required) =>
        documents.some((doc) => doc.type === required.documentType),
      );

      // check if all required docs are completed
      const allCompleted = requiredDocs.every((required) =>
        documents.some(
          (doc) =>
            doc.type === required.documentType &&
            doc.reviewStatus === "completed",
        ),
      );

      const showCompleted = allSubmitted && allCompleted;
      return (
        <Badge
          variant={"outline"}
          className={`flex justify-evenly ${allSubmitted ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"} `}
        >
          {showCompleted ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>completed</span>
            </>
          ) : (
            <>
              <Clock className="h-4 w-4" />
              <span>pending</span>
            </>
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
