"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import type {
  AdditionalInfo,
  BenefitItem,
} from "@/interfaces/scholarship-form";

interface ProgramDetailsProps {
  additionalInfo: AdditionalInfo;
  updateDetails: (updates: Partial<AdditionalInfo>) => void;
  updateArray: (key: keyof AdditionalInfo, index: number, value: any) => void;
  addToArray: (key: keyof AdditionalInfo, value: any) => void;
  removeFromArray: (key: keyof AdditionalInfo, index: number) => void;
}

/**
 * Program Details section component
 * Handles overview, notes, history, and benefits
 */
export function ProgramDetails({
  additionalInfo,
  updateDetails,
  updateArray,
  addToArray,
  removeFromArray,
}: ProgramDetailsProps) {
  const textFields = [
    { key: "overview", label: "Overview", rows: 4, maxLength: 1000 },
    { key: "note", label: "Note", rows: 2, maxLength: 500 },
    { key: "history", label: "History", rows: 4, maxLength: 1000 },
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Program Details</CardTitle>
        <CardDescription>
          Detailed information about the scholarship
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {textFields.map(({ key, label, rows, maxLength }) => (
          <div key={key} className="space-y-2">
            <Label className="capitalize">{label}</Label>
            <Textarea
              value={additionalInfo[key]}
              onChange={(e) => updateDetails({ [key]: e.target.value })}
              placeholder={`Enter ${label.toLowerCase()}`}
              rows={rows}
            />
            <div className="text-muted-foreground text-xs">
              {additionalInfo[key].length}/{maxLength} characters
            </div>
          </div>
        ))}

        <div className="space-y-2">
          <Label>Benefits</Label>
          {additionalInfo.benefits.map(
            (benefit: BenefitItem, index: number) => (
              <div key={index} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Badge>Benefit {index + 1}</Badge>
                  {additionalInfo.benefits.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromArray("benefits", index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input
                  value={benefit.title}
                  onChange={(e) =>
                    e.target.value.length <= 50 &&
                    updateArray("benefits", index, {
                      ...benefit,
                      title: e.target.value,
                    })
                  }
                  placeholder="Benefit title"
                />
                <div className="text-muted-foreground text-xs">
                  {benefit.title.length}/50 characters
                </div>
                <Textarea
                  value={benefit.description}
                  onChange={(e) =>
                    e.target.value.length <= 500 &&
                    updateArray("benefits", index, {
                      ...benefit,
                      description: e.target.value,
                    })
                  }
                  placeholder="Benefit description"
                />
                <div className="text-muted-foreground text-xs">
                  {benefit.description.length}/500 characters
                </div>
              </div>
            ),
          )}

          <Button
            type="button"
            onClick={() =>
              addToArray("benefits", { title: "", description: "" })
            }
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Benefit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
