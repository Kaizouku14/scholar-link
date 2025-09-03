import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import type { UseFormReturn } from "react-hook-form";
import type { Accounts } from "../form-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SECTIONS } from "@/constants/users/sections";

export const CoordinatorFields = ({
  form,
}: {
  form: UseFormReturn<Accounts>;
}) => (
  <>
    <FormField
      control={form.control}
      name="department"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Department *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Assign the coordinator to a department.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="course"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Course *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {COURSES.map((course) => (
                <SelectItem key={course} value={course}>
                  {course
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Select the course the coordinator will manage.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="section"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assigned Sections *</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-transparent"
              >
                {field.value?.length > 0
                  ? field.value.join(", ")
                  : "Select sections"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] space-y-2 p-2">
              <div className="text-muted-foreground text-xs">
                Select sections
              </div>
              {SECTIONS.map((section) => {
                const checked = field.value?.includes(section);
                return (
                  <div
                    key={section}
                    className="hover:bg-muted flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1"
                    onClick={() => {
                      if (checked) {
                        field.onChange(
                          field.value?.filter((s: string) => s !== section) ||
                            [],
                        );
                      } else {
                        field.onChange([...(field.value || []), section]);
                      }
                    }}
                  >
                    <Checkbox checked={checked} />
                    <span>Section: {section}</span>
                  </div>
                );
              })}
            </PopoverContent>
          </Popover>
          <FormDescription>
            Assign the coordinator to one or more sections.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);
