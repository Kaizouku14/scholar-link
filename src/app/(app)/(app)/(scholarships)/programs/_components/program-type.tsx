"use client";

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
import { Check, ChevronsUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ProgramType = ({
  selectedType,
  onTypeChange,
}: {
  selectedType: string;
  onTypeChange: (value: string) => void;
}) => {
  const { data, isLoading } = api.scholarships.getAllScholarshipType.useQuery();
  const [open, setOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-10 w-[210px]" />
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-10 w-[210px] justify-between"
            >
              {selectedType
                ? data?.find((type) => type === selectedType)
                : "Select Program Type"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[210px] p-0">
            <Command>
              <CommandInput placeholder="Search type..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {data?.map((type) => (
                    <CommandItem
                      className="h-10"
                      key={type}
                      value={type}
                      onSelect={(currentValue) => {
                        onTypeChange(
                          currentValue === selectedType ? "" : currentValue,
                        );
                        setOpen(false);
                      }}
                    >
                      {type}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedType === type ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default ProgramType;
