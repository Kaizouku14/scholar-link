"use client";

import { useForm } from "react-hook-form";
import { formSchema, type FormSchema } from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOCUMENT_LABELS, DOCUMENTS } from "@/constants/internship/documents";
import { CalendarIcon, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/forms/submit-button";
import { api } from "@/trpc/react";
import { toast } from "react-hot-toast";

const DocumentForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: undefined,
      deadline: undefined,
    },
  });

  const { mutateAsync: postDocument } =
    api.internshipCoordinator.postDocumentDeadline.useMutation();
  const { refetch } = api.internshipUsers.getAllUpcomingDeadlines.useQuery(
    undefined,
    {
      enabled: false,
    },
  );
  const onSubmit = async (data: FormSchema) => {
    await toast.promise(postDocument(data), {
      loading: "Uploading document...",
      success: () => {
        refetch();
        return "Document uploaded successfully!";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  };

  return (
    <div className="border-border w-full rounded-xl border p-6">
      <Form {...form}>
        <div className="mb-4">
          <h2 className="text-foreground text-2xl font-semibold">
            Document Submission
          </h2>
          <p className="text-muted-foreground text-sm">
            provide the required document type and set a submission deadline.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-foreground text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  Document Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm focus:ring-2">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-border bg-popover text-popover-foreground rounded-lg border shadow-lg">
                    {DOCUMENTS.map((type, index) => (
                      <SelectItem
                        key={index}
                        value={type}
                        className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      >
                        {DOCUMENT_LABELS[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-destructive text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground flex items-center gap-2 text-sm font-medium">
                  <CalendarIcon className="h-4 w-4" />
                  Deadline
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`h-10 w-full justify-start rounded-lg border px-3 py-2 text-sm font-normal shadow-none ${
                          !field.value ? "text-muted-foreground" : ""
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="border-border bg-popover z-50 w-auto rounded-lg border p-0 shadow-lg"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      captionLayout="dropdown"
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-destructive text-xs" />
              </FormItem>
            )}
          />

          <SubmitButton
            formState={form.formState}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg"
          >
            Submit
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default DocumentForm;
