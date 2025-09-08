import type { RequirementType } from "@/constants/scholarship/requirements";

export interface Requirement {
  requirementId: string;
  label: string;
  type: RequirementType;
  description?: string | null;
  isRequired: boolean;
}
