export const SECTIONS = ["A", "B", "C", "D", "E"] as const;
export type SectionType = (typeof SECTIONS)[number];

export const SECTIONS_LABELS = [
  {
    label: "A",
    value: "A",
  },
  {
    label: "B",
    value: "B",
  },
  {
    label: "C",
    value: "C",
  },
  {
    label: "D",
    value: "D",
  },
  {
    label: "E",
    value: "E",
  },
];
