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
import { COURSE_LABELS } from "@/constants/users/courses";

type AccountListProps = {
  value: string;
  onChange: (value: string) => void;
};

export const InternsComboBox = ({ value, onChange }: AccountListProps) => {
  const [open, setOpen] = React.useState(false);
  const { data } = api.internshipCoordinator.getAllUserAccount.useQuery();

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
            ? data?.find((detail) => detail.userId === value)?.name
            : "Select student..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search student..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Student found.</CommandEmpty>
            <CommandGroup>
              {data?.map((detail) => (
                <CommandItem
                  key={detail.userId}
                  value={detail.name}
                  onSelect={() => {
                    onChange(detail.userId);
                    setOpen(false);
                  }}
                >
                  <div className="flex w-full flex-col text-xs">
                    <span>{detail.name}</span>
                    <div className="text-muted-foreground flex gap-1">
                      {COURSE_LABELS[detail.course!]} · {detail.section}
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === detail.userId ? "opacity-100" : "opacity-0",
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
