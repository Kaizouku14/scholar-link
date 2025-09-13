export interface ScholarDocument {
  id: string;
  label: string;
  url: string | null;
  reviewStatus: boolean;
  submittedAt: Date;
}
