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
import { Skeleton } from "@/components/ui/skeleton";

type EmailListProps = {
  value: string;
  onChange: (value: string) => void;
};

const EmailComboBox = ({ value, onChange }: EmailListProps) => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = api.user.getAllUserEmail.useQuery();

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between shadow-none"
            >
              {value ? (
                data?.find((item) => item.id === value)?.email
              ) : (
                <span className="text-muted-foreground">Select Email...</span>
              )}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[450px] p-1">
            <Command>
              <CommandInput placeholder="Search Email..." className="h-9" />
              <CommandList>
                <CommandEmpty>No Email found.</CommandEmpty>
                <CommandGroup>
                  {data && data.length > 0 ? (
                    data.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={(selectedEmail) => {
                          onChange(selectedEmail);
                          setOpen(false);
                        }}
                        className="p-2"
                      >
                        {item.email}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === item.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))
                  ) : (
                    <CommandItem disabled className="flex justify-center">
                      <span> No emails available</span>
                    </CommandItem>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default EmailComboBox;
