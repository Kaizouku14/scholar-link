import type { Requirement } from "@/interfaces/scholarship/requirements";
import { FileText } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type { Control, Path } from "react-hook-form";
import type { z } from "zod";

type RenderRequirementItemProps<
  TSchema extends z.ZodTypeAny,
  TFormData extends Record<string, unknown> = z.infer<TSchema>,
> = {
  requirement: Requirement;
  control: Control<TFormData>;
};

export const RenderRequirementItem = <
  TSchema extends z.ZodTypeAny,
  TFormData extends Record<string, unknown> = z.infer<TSchema>,
>({
  requirement,
  control,
}: RenderRequirementItemProps<TSchema, TFormData>) => (
  <FormField
    key={requirement.requirementId}
    control={control}
    name={requirement.requirementId! as Path<TFormData>}
    render={({ field: { onChange, ref } }) => (
      <FormItem className="space-y-1">
        <FormLabel className="flex items-center gap-2 text-sm font-medium">
          <FileText className="text-muted-foreground h-4 w-4" />
          {requirement.label}
        </FormLabel>
        <FormControl>
          <Input
            type="file"
            accept=".pdf,.doc,.docx,.xlsx,.csv,.png,.jpeg.,jpg"
            onChange={(e) => onChange(e.target.files)}
            ref={ref}
            className="cursor-pointer text-sm"
          />
        </FormControl>
        <FormDescription className="text-muted-foreground text-xs">
          {requirement.description ?? ""}
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
