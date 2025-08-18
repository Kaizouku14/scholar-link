export const DEPARTMENTS = ["ITDS", "BEED", "GATE"] as const;
export type departmentType = (typeof DEPARTMENTS)[number];

export const DEPARMENTS_LABELS = {
  ITDS: "Information Technology and Data Science",
  BEED: "Bachelor of elementary education",
  GATE: "General Academics and teacher education",
};
