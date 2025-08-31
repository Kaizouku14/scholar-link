"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { SECTIONS } from "@/constants/users/sections";
import type { UseFormReturn } from "react-hook-form";
import type { Accounts } from "../form-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StudentFields = ({ form }: { form: UseFormReturn<Accounts> }) => (
  <section>
    <h2 className="mb-2 text-lg font-semibold">Student Information</h2>
    <p className="text-muted-foreground mb-6 text-sm">
      Student-specific details and academic information.
    </p>

    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="studentNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Student Number *</FormLabel>
            <FormControl>
              <Input placeholder="2022500330" {...field} />
            </FormControl>
            <FormDescription>
              Use the official format (e.g. 202500330).
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
            <FormLabel>Section *</FormLabel>
            <Select
              onValueChange={(value) => field.onChange([value])}
              defaultValue={field.value?.[0]}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SECTIONS.map((section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Assign the student&apos;s class section.
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
    </div>
  </section>
);
