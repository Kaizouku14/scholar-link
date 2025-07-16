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
import { X } from "lucide-react";
import { toast } from "sonner";
import { Paperclip, ImageIcon, Send } from "lucide-react";
import { formSchema, type FormSchema } from "./schema";
import EmailComboBox from "./email-cb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ComposeFormProps {
  onSuccess?: () => void;
}

const ComposeForm = ({ onSuccess }: ComposeFormProps) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      // Here's where you'd handle the actual email sending
      console.log("Sending email:", values);
      console.log("Attachments:", attachments);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Email sent successfully!");

      // Reset form and close dialog
      form.reset();
      setAttachments([]);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      console.error("Email send error:", error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachments((prev) => [...prev, file]);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setAttachments((prev) => [...prev, file]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormControl>
                <Input id="subject" placeholder="Email subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {attachments.length > 0 && (
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
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
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

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
                  className="min-h-[200px] resize-none"
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
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload File</p>
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
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload Image</p>
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
                <>Sending...</>
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
          accept=".png, .jpg, .jpeg, .gif, .webp"
        />
      </form>
    </Form>
  );
};

export default ComposeForm;
