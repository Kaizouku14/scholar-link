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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import ArrayField from "../form-builder/array-field";
import type {
  AdditionalInfo,
  ImportantDate,
  EvaluationCriteria,
} from "@/interfaces/scholarship-form";

interface ApplicationProcessProps {
  additionalInfo: AdditionalInfo;
  updateArray: (key: keyof AdditionalInfo, index: number, value: any) => void;
  addToArray: (key: keyof AdditionalInfo, value: any) => void;
  removeFromArray: (key: keyof AdditionalInfo, index: number) => void;
}

/**
 * Application Process section component
 * Handles process steps, important dates, and evaluation criteria
 */
export function ApplicationProcess({
  additionalInfo,
  updateArray,
  addToArray,
  removeFromArray,
}: ApplicationProcessProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Application Process
        </CardTitle>
        <CardDescription>Steps, dates, and evaluation criteria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ArrayField
          label="Process Steps"
          items={additionalInfo.processSteps}
          arrayKey="processSteps"
          placeholder="Enter process step"
          onUpdate={updateArray}
          onAdd={addToArray}
          onRemove={removeFromArray}
        />

        {/* Important Dates */}
        <div className="space-y-2">
          <Label>Important Dates</Label>
          {additionalInfo.importantDates.map(
            (date: ImportantDate, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2"
              >
                <div>
                  <Input
                    value={date.label}
                    onChange={(e) =>
                      e.target.value.length <= 50 &&
                      updateArray("importantDates", index, {
                        ...date,
                        label: e.target.value,
                      })
                    }
                    placeholder="Date label"
                  />
                  <div className="text-muted-foreground mt-1 text-xs">
                    {date.label.length}/50 characters
                  </div>
                </div>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[420px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date.date ? (
                          format(new Date(date.date), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date.date ? new Date(date.date) : undefined}
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            updateArray("importantDates", index, {
                              ...date,
                              date: selectedDate.toISOString().split("T")[0],
                            });
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={additionalInfo.importantDates.length === 1}
                    size="icon"
                    onClick={() => removeFromArray("importantDates", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ),
          )}
          <Button
            type="button"
            onClick={() =>
              addToArray("importantDates", { label: "", date: "" })
            }
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Date
          </Button>
        </div>

        {/* Evaluation Criteria */}
        <div className="space-y-2">
          <Label>Evaluation Criteria</Label>
          {additionalInfo.evaluationCriteria.map(
            (criteria: EvaluationCriteria, index: number) => (
              <div key={index} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Badge>Criteria {index + 1}</Badge>
                  {additionalInfo.evaluationCriteria.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        removeFromArray("evaluationCriteria", index)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Input
                      value={criteria.name}
                      onChange={(e) =>
                        e.target.value.length <= 50 &&
                        updateArray("evaluationCriteria", index, {
                          ...criteria,
                          name: e.target.value,
                        })
                      }
                      placeholder="Criteria name"
                    />
                    <div className="text-muted-foreground mt-1 text-xs">
                      {criteria.name.length}/50 characters
                    </div>
                  </div>
                  <Input
                    value={criteria.weight}
                    onChange={(e) =>
                      updateArray("evaluationCriteria", index, {
                        ...criteria,
                        weight: e.target.value,
                      })
                    }
                    placeholder="e.g., 30% or 30"
                  />
                </div>
                <Textarea
                  value={criteria.description}
                  onChange={(e) =>
                    e.target.value.length <= 300 &&
                    updateArray("evaluationCriteria", index, {
                      ...criteria,
                      description: e.target.value,
                    })
                  }
                  placeholder="Criteria description"
                />
                <div className="text-muted-foreground text-xs">
                  {criteria.description.length}/300 characters
                </div>
              </div>
            ),
          )}
          <Button
            type="button"
            onClick={() =>
              addToArray("evaluationCriteria", {
                name: "",
                weight: "",
                description: "",
              })
            }
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Criteria
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
