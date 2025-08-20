import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ManagementCardProps } from "@/interfaces/internship/management";
import Link from "next/link";

export function ManagementCard({
  title,
  description,
  total,
  totalLabel,
  growth,
  icon: Icon,
  items,
  actionLabel,
  page,
}: ManagementCardProps) {
  return (
    <Card className="w-full rounded-2xl shadow-none">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>
          {growth !== undefined && (
            <span
              className={`text-sm font-medium ${
                growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {growth >= 0 ? `+${growth}` : growth}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="text-muted-foreground h-6 w-6" />}
          <div>
            <p className="text-muted-foreground text-xs">{totalLabel}</p>
            <p className="text-2xl font-bold">{total}</p>
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border px-3 py-2"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground text-sm">
                {item.count} {item.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href={page}
          className="mt-2 flex w-full rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-white/90 md:mt-0 hover:dark:text-black"
        >
          {actionLabel}
        </Link>
      </CardContent>
    </Card>
  );
}
