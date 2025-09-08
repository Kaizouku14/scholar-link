"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, ImageIcon, Type } from "lucide-react";
import { useState } from "react";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import { createFormSchema } from "./flexible-form-schema";
import type z from "zod";

export const ApplicationForm = ({
  requirements,
}: {
  requirements: Requirement[];
}) => {
  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});

  const formSchema = createFormSchema(requirements);
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  const handleTextChange = (requirementId: string, value: string) => {
    const wordCount = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    setWordCounts((prev) => ({ ...prev, [requirementId]: wordCount }));
  };

  const renderField = (requirement: Requirement) => {
    switch (requirement.type) {
      case "document":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription>{requirement.description}</FormDescription>
                )}
                <FormControl>
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => onChange(e.target.files)}
                      className="file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "image":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription>{requirement.description}</FormDescription>
                )}
                <FormControl>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files)}
                      className="file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "text":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription>{requirement.description}</FormDescription>
                )}
                <FormControl>
                  <Input placeholder="Enter your answer..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "essay":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{requirement.label}</FormLabel>
                {requirement.description && (
                  <FormDescription>{requirement.description}</FormDescription>
                )}
                <FormControl>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Start writing your essay..."
                      className="min-h-[200px] resize-y"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleTextChange(
                          requirement.requirementId,
                          e.target.value,
                        );
                      }}
                    />
                    <div className="text-muted-foreground text-right text-sm">
                      Word count: {wordCounts[requirement.requirementId] ?? 0}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Submit Your Requirements
        </CardTitle>
        <CardDescription>
          Please complete all required fields and upload the necessary
          documents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {requirements.map(renderField)}

            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg">
                Submit Requirements
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
