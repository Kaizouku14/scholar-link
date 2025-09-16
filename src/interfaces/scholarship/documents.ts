export interface ScholarDocument {
  id: string;
  label: string;
  url: string | null;
  reviewed: boolean;
  submittedAt: Date;
}
