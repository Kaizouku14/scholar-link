import { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: ReactNode;
}

export function StatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <div className="border-border flex flex-col justify-between rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
          {icon}
        </div>
      </div>
      <span className="mt-3 text-2xl font-bold">{value}</span>
      <span className="text-muted-foreground mt-1 text-xs">{subtitle}</span>
    </div>
  );
}
