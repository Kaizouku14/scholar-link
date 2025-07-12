export const FIELD_TYPES = ["text", "textarea", "file", "photo"] as const;

export type FieldType = (typeof FIELD_TYPES)[number];
