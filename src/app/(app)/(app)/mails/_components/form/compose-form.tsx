"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle, X } from "lucide-react";
import { toast } from "sonner";
import { Paperclip, ImageIcon, Send } from "lucide-react";
import { formSchema, type FormSchema } from "./schema";
import EmailComboBox from "./email-cb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ComposeFormProps {
  onSuccess?: () => void;
}

const ComposeForm = ({ onSuccess }: ComposeFormProps) => {
  const [imageAttachments, setImageAttachments] = useState<File[]>([]);
  const [fileAttachments, setFileAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 4 * 1024 * 1024;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      subject: "",
      content: "",
    },
  });

  const handleSubmit = async (values: FormSchema) => {
    try {
      console.log("Sending email:", values);
      console.log("Image Attachments:", imageAttachments);
      console.log("File Attachments:", fileAttachments);

      toast.success("Email sent successfully!");

      form.reset();
      setImageAttachments([]);
      setFileAttachments([]);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      console.error("Email send error:", error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be 4MB or less.");
      return;
    }

    setFileAttachments((prev) => [...prev, file]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file!.size > MAX_FILE_SIZE) {
      toast.error("Image size must be 4MB or less.");
      return;
    }

    if (file && file.type.startsWith("image/")) {
      setImageAttachments((prev) => [...prev, file]);
    }
  };

  const removeImageAttachment = (index: number) => {
    setImageAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const removeFileAttachment = (index: number) => {
    setFileAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="to">To :</FormLabel>
              <FormControl>
                <EmailComboBox value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="subject">Subject : </FormLabel>
              <FormControl>
                <Input id="subject" placeholder="Email subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <ScrollArea className="max-h-18 max-w-[450px]">
          {(imageAttachments.length > 0 || fileAttachments.length > 0) && (
            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="flex gap-2 px-1 pb-3">
                {imageAttachments.map((file, index) => (
                  <div
                    key={index}
                    className="bg-muted flex items-center gap-2 rounded-md px-3 py-1 text-sm"
                  >
                    <span className="max-w-[150px] truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeImageAttachment(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {fileAttachments.map((file, index) => (
                  <div
                    key={index}
                    className="bg-muted flex items-center gap-2 rounded-md px-3 py-1 text-sm"
                  >
                    <span className="max-w-[150px] truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeFileAttachment(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="content">Message</FormLabel>
              <FormControl>
                <Textarea
                  id="content"
                  placeholder="Write your message..."
                  className="h-48 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={triggerFileUpload}
                  title="Attach file"
                  disabled={fileAttachments.length >= 4}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload File (.pdf, .docx, .xlsx)</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={triggerImageUpload}
                  title="Attach image"
                  disabled={imageAttachments.length >= 4}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload Image (.png, .jpg, .jpeg)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSuccess?.()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <div className="flex gap-1">
                  <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf, .doc, .docx, .xls, .xlsx"
        />
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageUpload}
          className="hidden"
          accept=".png, .jpg, .jpeg"
        />
      </form>
    </Form>
  );
};

export default ComposeForm;
