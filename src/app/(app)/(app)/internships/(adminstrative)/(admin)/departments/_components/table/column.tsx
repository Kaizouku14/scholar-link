import type { ColumnDef } from "@tanstack/react-table";
import type { DepartmentColumn } from "./column-schema";
import {
  Building,
  CheckCircle,
  Clock,
  Hourglass,
  Users,
  UsersRound,
  XCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusVariant, cn } from "@/lib/utils";
import { DataTableRowActions } from "./table-row-actions";

export const departmentsColumn: ColumnDef<DepartmentColumn>[] = [
  {
    accessorKey: "deparment",
    header: "Department",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
          <Building className="text-muted-foreground h-4 w-4" />
        </div>
        {row.original.deparment}
        {/* {DEPARMENTS_LABELS[row.original.deparment]} */}
      </div>
    ),
  },
  {
    accessorKey: "coordinators",
    header: "Coordinators",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
          <Users className="text-muted-foreground h-4 w-4" />
        </div>
        {row.original.coordinators}
      </div>
    ),
  },
  {
    accessorKey: "interns",
    header: "Interns",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
          <UsersRound className="text-muted-foreground h-4 w-4" />
        </div>
        {row.original.interns}
      </div>
    ),
  },
  {
    accessorKey: "requiredHours",
    header: "Required Hours",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span>{row.original.requiredHours}</span>
        <span className="text-muted-foreground">hrs</span>
      </div>
    ),
  },
  {
    accessorKey: "totalProgressHours",
    header: "Progress",
    cell: ({ row }) => {
      const { totalProgressHours, interns, requiredHours } = row.original;
      const percentage =
        Number(totalProgressHours) > 0
          ? Number(
              (
                (Number(totalProgressHours) /
                  (interns * Number(requiredHours))) *
                100
              ).toFixed(1),
            )
          : 0;
      return (
        <div className="flex w-24 items-center gap-2">
          <Progress value={percentage} />
          <span className="text-muted-foreground">{percentage}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    accessorFn: (row) => {
      const percentage =
        Number(row.totalProgressHours) > 0
          ? Number(
              (
                (Number(row.totalProgressHours) /
                  (row.interns * Number(row.requiredHours))) *
                100
              ).toFixed(1),
            )
          : 0;

      return percentage === 0
        ? "pending"
        : percentage >= 100
          ? "completed"
          : "in-progress";
    },
    cell: ({ row }) => {
      const { totalProgressHours, interns, requiredHours } = row.original;
      const percentage =
        Number(totalProgressHours) > 0
          ? Number(
              (
                (Number(totalProgressHours) /
                  (interns * Number(requiredHours))) *
                100
              ).toFixed(1),
            )
          : 0;

      const status =
        percentage === 0
          ? "pending"
          : percentage >= 100
            ? "completed"
            : "in-progress";
      const color = getStatusColor(status);
      const variant = getStatusVariant(status);
      return (
        <Badge
          variant={variant}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
            color,
          )}
        >
          {status === "pending" ? (
            <Clock className={cn("h-4 w-4", color)} />
          ) : status === "in-progress" ? (
            <Hourglass className={cn("h-4 w-4", color)} />
          ) : status === "completed" ? (
            <CheckCircle className={cn("h-4 w-4", color)} />
          ) : (
            <XCircle className={cn("h-4 w-4", color)} />
          )}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
