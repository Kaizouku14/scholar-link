import {
  getStatusVariant,
  getStatusColor,
  cn,
  getStatusIcon,
} from "@/lib/utils";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import React from "react";
import { COURSE_LABELS, type courseType } from "@/constants/users/courses";
import type { internshipStatusType } from "@/constants/users/status";
import type { SectionType } from "@/constants/users/sections";

export const InternCard = ({
  intern,
}: {
  intern: {
    name: string;
    email: string;
    profile?: string | null;

    course?: courseType | null;
    status?: internshipStatusType | null;
    section?: SectionType[] | null;
  };
}) => {
  const { status } = intern;

  console.log(status);
  const variant = getStatusVariant(status ?? "default");
  const color = getStatusColor(status ?? "default");

  return (
    <div className="border-border hover:bg-muted/50 rounded-md border p-3 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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
              {intern.name}
            </h3>
            <p className="text-muted-foreground text-xs">{intern.email}</p>

            {intern.course && intern.section && (
              <div className="mt-1 flex gap-4 text-xs">
                <div className="flex gap-1">
                  <span className="text-card-foreground font-medium">
                    Course:
                  </span>
                  <p className="text-muted-foreground">
                    {COURSE_LABELS[intern.course]}
                  </p>
                </div>
                <div className="flex gap-1">
                  <span className="text-card-foreground font-medium">
                    Section:
                  </span>
                  <p className="text-muted-foreground">{intern.section[2]}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Badge
          variant={variant ?? "outline"}
          className={cn(
            "flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all duration-200",
            color,
          )}
        >
          {React.createElement(getStatusIcon(status ?? "default"), {
            className: cn("h-3 w-3", color),
          })}
          {status}
        </Badge>
      </div>
    </div>
  );
};
