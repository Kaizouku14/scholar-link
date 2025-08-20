"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdditionalInfo } from "@/interfaces/scholarship/scholarship-form";
import { Plus, Trash2 } from "lucide-react";

interface ArrayFieldProps {
  label: string;
  items: string[];
  arrayKey: keyof AdditionalInfo;
  placeholder?: string;
  maxLength?: number;
  onUpdate: (key: keyof AdditionalInfo, index: number, value: string) => void;
  onAdd: (key: keyof AdditionalInfo, value: string) => void;
  onRemove: (key: keyof AdditionalInfo, index: number) => void;
}

/**
 * Reusable array field component for managing dynamic lists
 * Supports adding, removing, and updating array items with character limits
 */
export default function ArrayField({
  label,
  items,
  arrayKey,
  placeholder = "",
  maxLength = 200,
  onUpdate,
  onAdd,
  onRemove,
}: ArrayFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex-1">
            <Input
              value={item}
              onChange={(e) =>
                e.target.value.length <= maxLength &&
                onUpdate(
                  arrayKey as keyof AdditionalInfo,
                  index,
                  e.target.value,
                )
              }
              placeholder={placeholder}
            />
            <div className="text-muted-foreground mt-1 text-xs">
              {item.length}/{maxLength} characters
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={items.length === 1}
            onClick={() => onRemove(arrayKey, index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => onAdd(arrayKey, "")}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add {label}
      </Button>
    </div>
  );
}
