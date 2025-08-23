"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
import { toast } from "react-hot-toast";
import { LoaderCircle, Send } from "lucide-react";
import { formSchema, type FormSchema } from "./schema";
import EmailComboBox from "./email-cb";
import { api } from "@/trpc/react";

interface ComposeFormProps {
  onSuccess?: () => void;
  refetch: () => Promise<unknown>;
}
const ComposeForm = ({ onSuccess, refetch }: ComposeFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      subject: "",
      content: "",
    },
  });

  const { mutateAsync: sendMailToMutation, isPending } =
    api.mail.sendMailTo.useMutation();
  const handleSubmit = async (values: FormSchema) => {
    const { to, subject, content } = values;

    try {
      await toast.promise(
        sendMailToMutation({
          reciever: to,
          subject,
          content,
        }),
        {
          loading: "Sending email...",
          success: () => {
            form.reset();
            void refetch();

            return "Email sent successfully";
          },
          error: (error) => {
            return (error as Error).message;
          },
        },
      );
    } catch {
      toast.error("Failed to send email. Please try again.");
    }
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

        <div className="flex items-center justify-end space-x-2 py-2">
          <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <div className="text-foreground flex items-center gap-1">
                <LoaderCircle className="h-6 w-6 animate-spin" />
                <span className="animate-pulse">Sending...</span>
              </div>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ComposeForm;
