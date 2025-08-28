import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ManagementCardProps } from "@/interfaces/internship/management";
import Link from "next/link";

export function ManagementCard({
  title,
  description,
  total,
  totalLabel,
  icon: Icon,
  items,
  actionLabel,
  page,
}: ManagementCardProps) {
  return (
    <Card className="w-full rounded-2xl shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="text-muted-foreground h-6 w-6" />}
          <div>
            <p className="text-muted-foreground text-xs">{totalLabel}</p>
            <p className="text-2xl font-bold">{total}</p>
          </div>
        </div>

        <ScrollArea className="h-40">
          <div className="space-y-2">
            {items?.length > 0 &&
              items.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {item.count} Interns
                  </span>
                </div>
              ))}
          </div>
        </ScrollArea>

        <Link
          href={page}
          className="bg-primary hover:bg-primary/90 focus:ring-primary/50 mt-2 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:outline-none active:scale-95 active:shadow-sm"
        >
          {actionLabel}
        </Link>
      </CardContent>
    </Card>
  );
}
