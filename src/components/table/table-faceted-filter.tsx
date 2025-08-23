import * as React from "react";
import { type Column } from "@tanstack/react-table";
import { Check, PlusCircle } from "lucide-react";

import { cn, formatText } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface FilterConfig<TData, TValue> {
  column: Column<TData, TValue>;
  options: {
    label: string;
    value: string;
  }[];
}

interface DataTableMultiFacetedFilterProps<TData, TValue> {
  filters: FilterConfig<TData, TValue>[];
}

export function DataTableMultiFacetedFilter<TData, TValue>({
  filters,
}: DataTableMultiFacetedFilterProps<TData, TValue>) {
  // Flatten selected count across all filters
  const title = filters[0]?.column.columnDef.header as string;
  const totalSelected = filters.reduce((acc, filter) => {
    const selected = filter.column.getFilterValue() as string[] | undefined;
    return acc + (selected?.length ?? 0);
  }, 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg" className="h-10 border-dashed">
          <PlusCircle />
          {formatText(title)}
          {totalSelected > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {totalSelected}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search filters..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {filters.map((filter, i) => {
              const selectedValues = new Set(
                (filter.column.getFilterValue() as string[]) ?? [],
              );
              const facets = filter.column.getFacetedUniqueValues();

              return (
                <CommandGroup key={i} heading={title}>
                  {filter.options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.clear();
                            selectedValues.delete(option.value);
                          } else {
                            selectedValues.clear();
                            selectedValues.add(option.value);
                          }
                          const filterValues = Array.from(selectedValues);
                          filter.column.setFilterValue(
                            filterValues.length ? filterValues : undefined,
                          );
                        }}
                      >
                        <div
                          className={cn(
                            "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <Check />
                        </div>
                        <span>{formatText(option.label)}</span>
                        {facets?.get(option.value) && (
                          <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                            {facets.get(option.value)}
                          </span>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}

            {totalSelected > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() =>
                      filters.forEach((filter) =>
                        filter.column.setFilterValue(undefined),
                      )
                    }
                    className="justify-center text-center"
                  >
                    Clear all filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
