import {
  getStatusVariant,
  getStatusColor,
  cn,
  getStatusIcon,
} from "@/lib/utils";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import React from "react";

export const InternCard = ({
  intern,
}: {
  intern: {
    name: string;
    middleName: string;
    surname: string;
    email: string;
    profile?: string | null;

    course?: string | null;
    status?: string | null;
    section?: string | null;
  };
}) => {
  const { status } = intern;
  const variant = getStatusVariant(status ?? "default");
  const color = getStatusColor(status ?? "default");

  return (
    <div className="border-border hover:bg-muted/50 rounded-md border p-3 transition-colors">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={intern.profile ?? undefined}
                  className="object-cover"
                />
                <AvatarFallback className="text-sm">
                  {intern.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-card-foreground text-sm font-medium">
                  {intern.surname}, {intern.name}{" "}
                  {intern.middleName && `${intern.middleName} `}
                </h3>
                <p className="text-muted-foreground text-xs">{intern.email}</p>
              </div>
            </div>

            <Badge
              variant={variant ?? "outline"}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
                color ?? "border-gray-200 bg-gray-50 text-gray-700",
              )}
            >
              {React.createElement(getStatusIcon(status ?? "default"), {
                className: cn(color),
              })}
              {status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 text-xs">
          {intern.course && (
            <div>
              <span className="text-card-foreground font-medium">Course:</span>
              <p className="text-muted-foreground">{intern.course}</p>
            </div>
          )}

          {intern.section && (
            <div>
              <span className="text-card-foreground font-medium">Section:</span>
              <p className="text-muted-foreground">{intern.section}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
