import type { LucideIcon } from "lucide-react";

type ManagementItem = {
  name?: string | null;
  count: number;
};

export interface ManagementCardProps {
  title: string;
  description?: string;
  total: number;
  totalLabel: string;
  icon: LucideIcon;
  items: ManagementItem[];
  actionLabel: string;
  page: string;
}
