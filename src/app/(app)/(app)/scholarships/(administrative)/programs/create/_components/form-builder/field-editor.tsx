"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Trash2 } from "lucide-react";
import { FieldPreview } from "./field-preview";
import type { FormFieldProps } from "@/interfaces/scholarship-form";
import type { FieldType } from "@/constants/field-type";

interface FieldEditorProps {
  field: FormFieldProps;
  index: number;
  onUpdate: (id: string, updates: Partial<FormFieldProps>) => void;
  onRemove: (id: string) => void;
  onDuplicate: (index: number) => void;
}

/**
 * Field Editor component for creating and editing form fields
 * Provides a visual interface for configuring field properties
 */
export default function FieldEditor({
  field,
  index,
  onUpdate,
  onRemove,
  onDuplicate,
}: FieldEditorProps) {
  return (
    <Card className="bg-background border-border relative mb-4 border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <Input
              value={field.label}
              onChange={(e) => onUpdate(field.id, { label: e.target.value })}
              className="w-96 px-2.5 text-xl font-medium focus-visible:ring-0"
              placeholder="Enter Form Title"
            />
          </div>
          <div className="flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => onDuplicate(index)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Duplicate field</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => onRemove(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete field</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-2">Field Type</Label>
              <Select
                value={field.type}
                onValueChange={(value: string) =>
                  onUpdate(field.id, { type: value as FieldType })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="textarea">Essay</SelectItem>
                  <SelectItem value="file">File Upload</SelectItem>
                  <SelectItem value="photo">Photo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <div>
                <Label className="mb-2">Description</Label>
                <Input
                  value={field.description}
                  onChange={(e) =>
                    onUpdate(field.id, { description: e.target.value })
                  }
                  placeholder="Enter description"
                />
              </div>
              <div>
                {field.type !== "photo" && field.type !== "file" && (
                  <>
                    <Label className="mb-2">Placeholder</Label>
                    <Input
                      value={field.placeholder}
                      onChange={(e) =>
                        onUpdate(field.id, { placeholder: e.target.value })
                      }
                      placeholder="Enter placeholder"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={field.required}
                onCheckedChange={(checked) =>
                  onUpdate(field.id, { required: checked })
                }
              />
              <Label>Required field</Label>
            </div>
          </div>

          <FieldPreview field={field} />
        </div>
      </CardContent>
    </Card>
  );
}

export { FieldEditor };
