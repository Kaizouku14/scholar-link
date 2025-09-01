"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type QueryObserverResult } from "@tanstack/react-query";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
  type Table as DataTable,
} from "@tanstack/react-table";

import { useState } from "react";
import { DataTableToolbar } from "./table-toolbar";
import { DataTablePagination } from "./table-pagination";
import { ActionDialog } from "../dropdown/actions-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filteredTitle: string;
  columnVisibility?: VisibilityState;
  filters?: {
    column: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  refetch?: () => Promise<QueryObserverResult<TData[] | undefined, unknown>>;
  onImport?: () => void;
  onExport?: (row: DataTable<TData>) => void;
  viewOptions?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filteredTitle,
  columnVisibility,
  filters,
  refetch,
  onImport,
  onExport,
  viewOptions = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibilityState, setColumnVisibility] =
    useState<VisibilityState>({
      ...columnVisibility,
    });
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    state: {
      sorting,
      rowSelection,
      columnFilters,
      columnVisibility: columnVisibilityState,
    },
    meta: {
      refetch,
    },
  });

  return (
    <div className="w-full">
      <DataTableToolbar
        table={table}
        filteredTitle={filteredTitle}
        filters={filters}
        onImport={onImport}
        onExport={onExport}
        viewOptions={viewOptions}
      />

      <div className="border-border bg-card overflow-x-auto rounded-lg border">
        <Table className="min-w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-border border-b hover:bg-transparent"
              >
                {headerGroup.headers.map((header, index) => {
                  const isLastColumn = index === headerGroup.headers.length - 1;
                  const selectedRows = table.getSelectedRowModel().rows ?? [];
                  const showOptions = isLastColumn && selectedRows.length > 1;

                  return (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground bg-muted/30 border-border hover:bg-muted/50 h-12 border-r px-4 text-left align-middle font-medium whitespace-nowrap transition-colors last:border-r-0"
                    >
                      {showOptions ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </span>
                          <ActionDialog table={table} />
                        </div>
                      ) : header.isPlaceholder ? null : (
                        <span className="text-sm font-semibold">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-border/50 hover:bg-muted/50 data-[state=selected]:bg-primary/5 data-[state=selected]:border-primary/20 border-b transition-colors duration-150 ease-in-out ${
                    rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`border-border/30 border-r px-4 py-3 text-sm last:border-r-0 ${
                        row.getIsSelected()
                          ? "text-foreground font-medium"
                          : "text-foreground/90"
                      } whitespace-nowrap transition-colors duration-150`}
                    >
                      <div className="flex min-h-[20px] items-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
                      <svg
                        className="text-muted-foreground/50 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.5a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5H20"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-foreground/60 text-sm font-medium">
                        No data found
                      </p>
                      <p className="text-muted-foreground/70 text-xs">
                        There are no records to display at this time.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="w-full py-1">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
