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
import ArrayField from "../form-builder/array-field";
import type { AdditionalInfo } from "@/interfaces/scholarship-form";

interface EligibilitySectionProps {
  additionalInfo: AdditionalInfo;
  updateDetails: (updates: Partial<AdditionalInfo>) => void;
  updateArray: (key: keyof AdditionalInfo, index: number, value: any) => void;
  addToArray: (key: keyof AdditionalInfo, value: any) => void;
  removeFromArray: (key: keyof AdditionalInfo, index: number) => void;
}

/**
 * Eligibility section component
 * Handles eligibility criteria, priority, and maintenance requirements
 */
export function EligibilitySection({
  additionalInfo,
  updateDetails,
  updateArray,
  addToArray,
  removeFromArray,
}: EligibilitySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Eligibility</CardTitle>
        <CardDescription>Eligibility criteria and requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ArrayField
          label="Eligibility Criteria"
          items={additionalInfo.eligibilityCriteria}
          arrayKey="eligibilityCriteria"
          placeholder="Enter eligibility criteria"
          onUpdate={updateArray}
          onAdd={addToArray}
          onRemove={removeFromArray}
        />

        <div className="space-y-2">
          <Label>Priority</Label>
          <Textarea
            value={additionalInfo.priority}
            onChange={(e) =>
              e.target.value.length <= 500 &&
              updateDetails({ priority: e.target.value })
            }
            placeholder="Enter priority information"
          />
          <div className="text-muted-foreground text-xs">
            {additionalInfo.priority.length}/500 characters
          </div>
        </div>

        <ArrayField
          label="Maintenance Requirements"
          items={additionalInfo.maintenanceRequirements}
          arrayKey="maintenanceRequirements"
          placeholder="Enter maintenance requirement"
          onUpdate={updateArray}
          onAdd={addToArray}
          onRemove={removeFromArray}
        />
      </CardContent>
    </Card>
  );
}
