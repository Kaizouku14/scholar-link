export interface Requirement {
  requirementId?: string;
  label: string;
  description?: string | null;
  isRequired: boolean;
}
