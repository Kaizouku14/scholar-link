"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Import, FileDown, X, Search, Filter, Settings2 } from "lucide-react";
import { DataTableFacetedFilter } from "./table-faceted-filter";
import { DataTableViewOptions } from "./table-view-options";
import { formatText } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, type ReactNode } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filteredTitle: string;
  filters?: {
    column: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  onImport?: () => void;
  onExport?: (table: Table<TData>) => void;
  viewOptions?: boolean;
}

export const DataTableToolbar = <TData,>({
  table,
  filteredTitle,
  filters,
  onImport,
  onExport,
  viewOptions,
}: DataTableToolbarProps<TData>) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isFiltered = table.getState().columnFilters.length > 0;
  const hasFilters = filters && filters.length > 0;

  return (
    <div className="space-y-3 md:mb-2">
      <div className="mb-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2 md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder={`Search ${formatText(filteredTitle)}...`}
                value={
                  (table
                    .getColumn(filteredTitle)
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(filteredTitle)
                    ?.setFilterValue(event.target.value)
                }
                className="h-10 w-full pl-10 sm:w-[220px] lg:w-[300px]"
              />
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              {filters?.map((filter) => (
                <DataTableFacetedFilter
                  key={filter.column}
                  filter={{
                    column: table.getColumn(filter.column)!,
                    options: filter.options,
                  }}
                />
              ))}
            </div>

            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="h-10 lg:hidden"
              >
                <Filter className="h-4 w-4" />
                {isFiltered && (
                  <span className="bg-primary text-primary-foreground ml-1 rounded-full px-1.5 py-0.5 text-xs">
                    {table.getState().columnFilters.length}
                  </span>
                )}
              </Button>
            )}

            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="hidden h-8 px-2 text-xs lg:flex lg:px-3"
              >
                Reset
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end">
            <div className="flex sm:hidden">
              {(onImport ?? onExport) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10">
                      <Settings2 className="h-4 w-4" />
                      <span className="ml-2">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {onImport && (
                      <DropdownMenuItem onClick={onImport}>
                        <Import className="mr-2 h-4 w-4" />
                        Import Data
                      </DropdownMenuItem>
                    )}
                    {onExport && (
                      <DropdownMenuItem onClick={() => onExport(table)}>
                        <FileDown className="mr-2 h-4 w-4" />
                        Export Data
                      </DropdownMenuItem>
                    )}
                    {viewOptions && (
                      <DropdownMenuItem asChild>
                        <DataTableViewOptions table={table} />
                      </DropdownMenuItem>
                    )}
                    {isFiltered && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => table.resetColumnFilters()}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Reset Filters
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              {onImport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onImport}
                  className="h-10"
                >
                  <Import className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Import</span>
                </Button>
              )}
              {onExport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport(table)}
                  className="h-10"
                >
                  <FileDown className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              )}
              {viewOptions && <DataTableViewOptions table={table} />}
            </div>
          </div>
        </div>
      </div>

      {showMobileFilters && hasFilters && (
        <div className="border-border bg-muted/50 flex flex-wrap gap-2 rounded-lg border p-3 lg:hidden">
          <div className="mb-2 flex w-full items-center justify-between">
            <span className="text-foreground text-sm font-medium">Filters</span>
            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.resetColumnFilters()}
                className="h-auto p-1 text-xs"
              >
                Reset all
              </Button>
            )}
          </div>
          <div className="flex w-full flex-wrap gap-2">
            {filters?.map((filter) => (
              <div key={filter.column} className="min-w-[120px] flex-1">
                <DataTableFacetedFilter
                  filter={{
                    column: table.getColumn(filter.column)!,
                    options: filter.options,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isFiltered && (
        <div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-2 text-sm md:hidden">
          <span>Active filters:</span>
          {table.getState().columnFilters.map((filter) => (
            <span
              key={filter.id}
              className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
            >
              {filter.id}:{" "}
              {Array.isArray(filter.value)
                ? filter.value.join(", ")
                : (filter.value as string) || (filter.value as ReactNode)}
              <button
                onClick={() =>
                  table.getColumn(filter.id)?.setFilterValue(undefined)
                }
                className="hover:bg-primary/20 ml-1 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
