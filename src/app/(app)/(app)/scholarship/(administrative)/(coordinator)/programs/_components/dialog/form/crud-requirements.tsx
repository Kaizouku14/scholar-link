import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Edit2, Check, X, FileText, AlertTriangle } from "lucide-react";
import { useState } from "react";
import type { ActivationSchema } from "../schema/activation-schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn, generateUUID } from "@/lib/utils";

const ConfirmDelete = ({
  index,
  remove,
}: {
  index: number;
  remove: (index: number) => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Delete Requirement</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone, and the requirement will be
            permanently removed from the program.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => remove(index)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const EditRequirements = () => {
  const { control } = useFormContext<ActivationSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements",
  });

  const watchedRequirements = useWatch({
    control,
    name: "requirements",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const startEditing = (index: number) => {
    setEditingIndex(index);
  };

  const cancelEditing = (index: number, isNew: boolean) => {
    if (isNew) {
      remove(index);
    }
    setEditingIndex(null);
  };

  const saveEditing = () => {
    setEditingIndex(null);
  };

  return (
    <div>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2">
          <span className="text-sm font-medium">Requirements</span>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              append({
                requirementId: generateUUID(),
                label: "",
                description: "",
                isRequired: false,
              });
              setEditingIndex(fields.length);
            }}
          >
            + Add Requirement
          </Button>
        </div>

        <ScrollArea className="h-72 p-1">
          <div className="flex flex-col-reverse space-y-1.5 p-2">
            {fields.map((field, index) => {
              const isEditing = editingIndex === index;
              const isNew = !field.label && !field.description;
              const liveField = watchedRequirements?.[index];

              return (
                <div
                  key={field.id}
                  className={cn(
                    "border-border flex flex-col gap-2.5 rounded-md border px-2.5 py-2",
                    index === fields.length - 1 && "mb-1.5",
                  )}
                >
                  {!isEditing ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-1.5">
                        <FileText className="h-4 w-4" />
                        <span className="max-w-[15rem] truncate text-sm font-medium">
                          {liveField?.label ?? "Draft"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => startEditing(index)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <ConfirmDelete index={index} remove={remove} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-4">
                        <FormItem className="flex-1">
                          <FormLabel>Label</FormLabel>
                          <FormControl>
                            <Controller
                              control={control}
                              name={`requirements.${index}.label`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Requirement label"
                                />
                              )}
                            />
                          </FormControl>
                        </FormItem>

                        <FormItem className="mt-6 flex items-center space-x-2">
                          <FormControl>
                            <Controller
                              control={control}
                              name={`requirements.${index}.isRequired`}
                              render={({ field }) => (
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              )}
                            />
                          </FormControl>
                          <FormLabel>Required</FormLabel>
                        </FormItem>
                      </div>

                      <FormItem className="mt-1">
                        <FormLabel>Description (optional)</FormLabel>
                        <FormControl>
                          <Controller
                            control={control}
                            name={`requirements.${index}.description`}
                            render={({ field }) => (
                              <Textarea
                                className="h-16"
                                value={field.value ?? ""}
                                onChange={field.onChange}
                                placeholder="Requirement details"
                              />
                            )}
                          />
                        </FormControl>
                      </FormItem>

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => cancelEditing(index, isNew)}
                        >
                          <X className="h-4 w-4" /> Cancel
                        </Button>
                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          onClick={saveEditing}
                        >
                          <Check className="h-4 w-4" /> Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default EditRequirements;
