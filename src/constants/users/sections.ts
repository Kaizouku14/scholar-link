export const SECTIONS = ["A", "B", "C", "D", "E"] as const;
export type SectionType = (typeof SECTIONS)[number];
