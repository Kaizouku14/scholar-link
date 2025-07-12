export const DEPARTMENTS = ['ITDS','BEED','GATE'] as const
export type depeartmentType = (typeof DEPARTMENTS)[number];
