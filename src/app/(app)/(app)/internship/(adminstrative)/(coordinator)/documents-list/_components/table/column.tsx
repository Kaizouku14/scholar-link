import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSE_LABELS } from "@/constants/users/courses";
import { YEAR_LEVEL_LABELS } from "@/constants/users/year-level";
import type { ColumnDef } from "@tanstack/react-table";
import type { DocumentListColumn } from "./column-schema";
import { CheckCircle, Clock, IdCard } from "lucide-react";
import { DOCUMENTS } from "@/constants/internship/documents";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "./table-row-actions";

export const DocumentListColumns: ColumnDef<DocumentListColumn>[] = [
  {
    accessorKey: "studentNo",
    header: "Student No.",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IdCard className="text-muted-foreground" />
        {row.original.studentNo}
      </div>
    ),
  },
  {
    accessorKey: "surname",
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
              {COURSE_LABELS[course]} · {YEAR_LEVEL_LABELS[yearLevel]}
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
      const submittedTypes = documents.map((doc) => doc.type);
      const allSubmitted = DOCUMENTS.every((required) =>
        submittedTypes.includes(required),
      );

      return allSubmitted ? "completed" : "pending";
    },
    cell: ({ row }) => {
      const { documents } = row.original;
      const submittedTypes = documents.map((doc) => doc.type);
      const allSubmitted = DOCUMENTS.every((required) =>
        submittedTypes.includes(required),
      );

      return (
        <Badge
          variant={"outline"}
          className={`flex justify-evenly ${allSubmitted ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"} `}
        >
          {allSubmitted ? (
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
