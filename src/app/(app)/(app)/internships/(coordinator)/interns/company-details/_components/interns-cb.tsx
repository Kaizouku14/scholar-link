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
import { YEAR_LEVEL_LABELS } from "@/constants/year-level";
import { COURSE_LABELS } from "@/constants/courses";

type AccountListProps = {
  value: string;
  onChange: (value: string) => void;
};

export const InternsComboBox = ({ value, onChange }: AccountListProps) => {
  const [open, setOpen] = React.useState(false);
  const { data } = api.internships.getAllUserAccountByDept.useQuery();

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
            ? data?.find((detail) => detail.id === value)?.studentNo
            : "Select student No."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search student No." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data &&
                data?.map((detail) => (
                  <CommandItem
                    key={detail.id}
                    value={detail.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    <div>{detail.studentNo}</div>
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
