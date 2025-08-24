"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, formatText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";

type DocumentProps = {
  value: string;
  onChange: (value: string) => void;
};

export const DocumentsCb = ({ value, onChange }: DocumentProps) => {
  const [open, setOpen] = React.useState(false);
  const { data } = api.internshipCoordinator.getAllDocuments.useQuery();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data?.find((detail) => detail.documentType === value)
                ?.documentType
            : "Select document"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search document" className="h-9" />
          <CommandList>
            <CommandEmpty>No document found.</CommandEmpty>
            <CommandGroup>
              {data?.map((detail) => (
                <CommandItem
                  key={detail.documentType}
                  value={detail.documentType}
                  onSelect={() => {
                    onChange(detail.documentType);
                    setOpen(false);
                  }}
                >
                  {formatText(detail.documentType)}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === detail.documentType
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
