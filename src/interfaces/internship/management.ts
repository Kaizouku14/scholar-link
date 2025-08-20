import type { LucideIcon } from "lucide-react";

type ManagementItem = {
  name: string;
  count: number;
  label: string;
};

export interface ManagementCardProps {
  title: string;
  description?: string;
  total: number;
  totalLabel: string;
  growth?: number;
  icon: LucideIcon;
  items: ManagementItem[];
  actionLabel: string;
  page: string;
}
