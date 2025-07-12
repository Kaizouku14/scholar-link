export const COURSES = [
  "BS in Information Technology",
  "BS in Data Science",
  "BS in Hospitality Management",
  "BS in Tourism Management",

  "Bachelor of Elementary Education",
  "BSEd Major in Filipino",
  "BSEd Major in English (Mandarin)",
  "BSEd Major in Mathematics",
  "BSEd Major in Sciences",
  "BSEd Major in Social Studies",

  "BS in Business Administration",
  "BS in Entrepreneurship",

  "BIT Major in Drafting Technology",
  "BIT Major in Computer Technology",
  "BIT Major in Electronics Technology",
  "BIT Major in Food Processing Technology",
] as const;

export type courseType = (typeof COURSES)[number];
