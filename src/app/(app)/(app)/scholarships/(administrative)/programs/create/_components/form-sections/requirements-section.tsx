"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import ArrayField from "../form-builder/array-field";
import type {
  AdditionalInfo,
  DocumentCategory,
} from "@/interfaces/scholarship/scholarship-form";

interface RequirementsSectionProps {
  additionalInfo: AdditionalInfo;
  updateArray: (key: keyof AdditionalInfo, index: number, value: any) => void;
  addToArray: (key: keyof AdditionalInfo, value: any) => void;
  removeFromArray: (key: keyof AdditionalInfo, index: number) => void;
}

/**
 * Requirements section component
 * Handles document categories and submission guidelines
 */
export function RequirementsSection({
  additionalInfo,
  updateArray,
  addToArray,
  removeFromArray,
}: RequirementsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Requirements</CardTitle>
        <CardDescription>
          Document categories and submission guidelines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Document Categories</Label>
          {additionalInfo.documentCategories.map(
            (category: DocumentCategory, categoryIndex: number) => (
              <div
                key={categoryIndex}
                className="space-y-2 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <Badge>Category {categoryIndex + 1}</Badge>
                  {additionalInfo.documentCategories.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        removeFromArray("documentCategories", categoryIndex)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input
                  value={category.name}
                  onChange={(e) =>
                    e.target.value.length <= 50 &&
                    updateArray("documentCategories", categoryIndex, {
                      ...category,
                      name: e.target.value,
                    })
                  }
                  placeholder="Category name"
                />
                <div className="text-muted-foreground text-xs">
                  {category.name.length}/50 characters
                </div>

                <div className="space-y-2">
                  <Label>Items</Label>
                  {category.items.map((item: string, itemIndex: number) => (
                    <div key={itemIndex} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          value={item}
                          onChange={(e) => {
                            if (e.target.value.length <= 100) {
                              const newItems = [...category.items];
                              newItems[itemIndex] = e.target.value;
                              updateArray("documentCategories", categoryIndex, {
                                ...category,
                                items: newItems,
                              });
                            }
                          }}
                          placeholder="Requirement item"
                        />
                        <div className="text-muted-foreground mt-1 text-xs">
                          {item.length}/100 characters
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={category.items.length === 1}
                        onClick={() => {
                          const newItems = category.items.filter(
                            (_, i) => i !== itemIndex,
                          );
                          updateArray("documentCategories", categoryIndex, {
                            ...category,
                            items: newItems,
                          });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newItems = [...category.items, ""];
                      updateArray("documentCategories", categoryIndex, {
                        ...category,
                        items: newItems,
                      });
                    }}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </div>
            ),
          )}
          <Button
            type="button"
            onClick={() =>
              addToArray("documentCategories", { name: "", items: [""] })
            }
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        <ArrayField
          label="Submission Guidelines"
          items={additionalInfo.submissionGuidelines}
          arrayKey="submissionGuidelines"
          placeholder="Enter submission guideline"
          maxLength={300}
          onUpdate={updateArray}
          onAdd={addToArray}
          onRemove={removeFromArray}
        />
      </CardContent>
    </Card>
  );
}
