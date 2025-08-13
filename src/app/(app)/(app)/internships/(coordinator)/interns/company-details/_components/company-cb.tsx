"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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

type CompanyComboboxProps = {
  value: string;
  onChange: (value: string) => void;
  setAddress: (value: string) => void;
};

export const CompanyCombobox = ({
  value,
  onChange,
  setAddress,
}: CompanyComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const { data: CompanyRecords } = api.internships.getCompanyRecords.useQuery();

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
            ? CompanyRecords?.find((detail) => detail.id === value)?.name
            : "Select Company..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search Company" className="h-9" />
          <CommandList>
            <CommandEmpty>No Company found.</CommandEmpty>
            <CommandGroup>
              {CompanyRecords &&
                CompanyRecords?.map((detail) => (
                  <CommandItem
                    key={detail.id}
                    value={detail.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                      setAddress(detail.address);
                    }}
                  >
                    <div>{detail.name}</div>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === detail.id ? "opacity-100" : "opacity-0",
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
