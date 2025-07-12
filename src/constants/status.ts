export const STATUS = ['pending','approved','rejected'] as const;
export type statusType = (typeof STATUS)[number];
