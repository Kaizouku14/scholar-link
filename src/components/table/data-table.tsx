"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type QueryObserverResult,
  type UseMutateAsyncFunction,
} from "@tanstack/react-query";
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
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTableToolbar } from "./table-toolbar";
import { DataTablePagination } from "./table-pagination";
import { ActionDialog } from "../dropdown/actions-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filteredTitle: string;
  filteredColumn?: string;
  columnVisibility?: VisibilityState;
  options?: {
    label: string;
    value: string;
  }[];
  refetch?: () => Promise<QueryObserverResult<TData[] | undefined, unknown>>;
  onImport?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filteredTitle,
  filteredColumn,
  columnVisibility,
  options,
  refetch,
  onImport,
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
    <div>
      <DataTableToolbar
        table={table}
        filteredTitle={filteredTitle}
        filteredColumn={filteredColumn}
        options={options}
        onImport={onImport}
      />
      <div className="border-border rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isLastColumn = index === headerGroup.headers.length - 1;
                  const selectedRows = table.getSelectedRowModel().rows ?? [];
                  const showOptions = isLastColumn && selectedRows.length > 1;

                  return (
                    <TableHead
                      key={header.id}
                      className="border-border border-b"
                    >
                      {showOptions ? (
                        <div className="flex items-center justify-between">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          <ActionDialog table={table} />
                        </div>
                      ) : header.isPlaceholder ? null : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-border border-y"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
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
