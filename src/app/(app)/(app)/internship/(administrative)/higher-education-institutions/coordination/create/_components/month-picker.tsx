"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface MonthYearPickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MonthYearPicker({
  value,
  onChange,
  placeholder = "Pick a month and year",
  className,
  disabled,
}: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState<number>(
    value?.getFullYear() ?? new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = React.useState<number>(
    value?.getMonth() ?? new Date().getMonth(),
  );

  // Generate years (current year ± 50 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthSelect = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(Number.parseInt(year));
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "hover:border-primary/50 w-full justify-start border-2 px-4 text-left font-normal transition-colors",
            !value && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="text-muted-foreground mr-3 h-5 w-5" />
          <span className="">{value ? formatDate(value) : placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-2 p-0 shadow-lg" align="start">
        <div className="bg-background space-y-6 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleMonthChange("prev")}
              className="hover:bg-muted h-9 w-9 rounded-full transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3">
              <span className="text-foreground min-w-[100px] text-center text-sm font-semibold">
                {months[selectedMonth]}
              </span>
              <Select
                value={selectedYear.toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="hover:border-primary/50 w-24 border-2 transition-colors">
                  <SelectValue className="font-medium" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year.toString()}
                      className="font-medium"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleMonthChange("next")}
              className="hover:bg-muted h-9 w-9 rounded-full transition-colors"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>

          <div>
            <Button
              onClick={handleMonthSelect}
              className="bg-primary hover:bg-primary/90 w-full font-medium shadow-sm transition-colors"
            >
              Select {months[selectedMonth]} {selectedYear}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { MonthYearPicker as DayYearPicker };
