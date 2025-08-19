"use client";
import { useForm } from "react-hook-form";
import { type DocumentSchema, documentSchema } from "./schema";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileTextIcon, Upload, XIcon } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DOCUMENT_LABELS } from "@/constants/documents";
import SubmitButton from "@/components/forms/submit-button";
import { api } from "@/trpc/react";
import { toast } from "react-hot-toast";
import { uploadSingleFile } from "@/lib/uploadthing";

const DocumentForm = () => {
  const form = useForm<DocumentSchema>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      documentType: undefined,
      documentFile: undefined,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data } = api.internships.getAllDocuments.useQuery();
  const { mutateAsync: uploadDocument } =
    api.internships.insertStudentDocument.useMutation();
  const onSubmit = async (data: DocumentSchema) => {
    const toastId = toast.loading("Uploading document...");
    try {
      const uploadedDocument = await uploadSingleFile(data.documentFile);
      if (!uploadedDocument?.url || !uploadedDocument?.key) {
        toast.error("Failed to upload document. Please try again.");
        return;
      }

      await uploadDocument({
        documentType: data.documentType,
        documentUrl: uploadedDocument.url,
        documentKey: uploadedDocument.key,
      });

      toast.success("Document uploaded successfully!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-foreground text-2xl font-bold">
          Upload Document
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-foreground">
                    Document Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover text-popover-foreground">
                      {data?.map((type, index) => (
                        <SelectItem key={index} value={type.documentType}>
                          {DOCUMENT_LABELS[type.documentType]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentFile"
              render={({
                field: { onChange, value, ...rest },
                formState: { errors },
              }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-foreground">
                    Upload Document
                  </FormLabel>
                  <FormControl>
                    <div className="border-input bg-background hover:bg-accent relative flex h-10 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition-colors">
                      <Upload className="text-muted-foregroun d h-4 w-4" />
                      <span className="text-muted-foreground text-sm">
                        Choose file
                      </span>
                      <Input
                        id="document-file-input"
                        type="file"
                        accept="application/pdf"
                        {...rest}
                        onChange={(e) => {
                          onChange(e.target.files?.[0] ?? null);
                        }}
                        ref={(e) => {
                          rest.ref?.(e);
                          fileInputRef.current = e;
                        }}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                    </div>
                  </FormControl>
                  {value && (
                    <div className="border-border bg-muted text-foreground flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <FileTextIcon className="text-primary h-4 w-4" />
                        <span className="max-w-[200px] truncate">
                          {value.name}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          onChange(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <XIcon className="h-4 w-4" />
                        <span className="sr-only">Clear document</span>
                      </Button>
                    </div>
                  )}
                  {errors.documentFile?.message && (
                    <FormMessage className="text-destructive">
                      {errors.documentFile?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <SubmitButton formState={form.formState} className="w-full">
              Submit
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DocumentForm;
