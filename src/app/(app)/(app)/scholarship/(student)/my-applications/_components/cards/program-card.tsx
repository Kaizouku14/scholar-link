"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, CheckCircle, Users, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import {
  cn,
  getStatusColor,
  getStatusIcon,
  getStatusVariant,
  isDeadlineApproaching,
  isDeadlinePassed,
} from "@/lib/utils";
import Link from "next/link";
import type { ScholarApplications } from "@/interfaces/scholarship/scholars";
import React from "react";
import { RenewalForm } from "../forms/renewal-form";

const ScholarsProgramCard = ({ data }: { data: ScholarApplications }) => {
  const isPassed = isDeadlinePassed(data.deadline);
  const isApproaching = isDeadlineApproaching(data.deadline);
  const color = getStatusColor(data.status);
  const variant = getStatusVariant(data.status);
  const renderStatusRow = (status: string, updatedAt: string | Date) => {
    let icon, label, color;

    switch (status) {
      case "active":
        icon = <CheckCircle className="h-4 w-4 text-green-600" />;
        label = "Accepted At";
        color = "text-green-600";
        break;

      case "inactive":
        icon = <XCircle className="text-destructive h-4 w-4" />;
        label = "Deactivated At";
        color = "text-destructive";
        break;

      case "renewal":
        icon = <Clock className="h-4 w-4 text-blue-500" />;
        label = "Renewed At";
        color = "text-blue-500";
        break;

      default:
        icon = <Clock className="text-muted-foreground h-4 w-4" />;
        label = "Updated At";
        color = "text-muted-foreground";
    }

    return (
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 text-sm">
          {icon}
          <span className={cn("font-medium", color)}>{label}</span>
        </div>
        <span className="text-muted-foreground text-sm">
          {format(new Date(updatedAt), "MMM dd, yyyy")}
        </span>
      </div>
    );
  };

  return (
    <Card
      className={cn(
        "mx-auto w-full rounded-lg border shadow-sm transition-all duration-200",
        (data.status === "inactive" || isPassed) && "bg-muted/30 opacity-75",
      )}
    >
      <CardHeader className="flex items-start space-y-0 pb-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-1 items-center space-x-4">
            <Avatar className="border-background h-14 w-14 border-2 shadow-sm">
              <AvatarImage
                src={data.image ?? undefined}
                alt={`${data.programName} logo`}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">
                {data.programName?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <h3 className="text-foreground line-clamp-2 text-xl font-semibold tracking-tight">
                {data.programName}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge
                  variant={variant}
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium capitalize",
                    color,
                  )}
                >
                  {React.createElement(getStatusIcon(data.status) ?? "div", {
                    className: cn(color),
                  })}
                  {data.status}
                </Badge>

                {isApproaching && (
                  <Badge variant="destructive" className="px-2 py-0.5 text-xs">
                    Deadline Soon
                  </Badge>
                )}
                {isPassed && (
                  <Badge
                    variant="outline"
                    className="text-muted-foreground px-2 py-0.5 text-xs"
                  >
                    Expired
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {data.description}
        </p>

        <div>
          <div className="flex items-center justify-between py-2">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Application Deadline</span>
            </div>
            <span
              className={cn(
                "text-sm",
                isPassed
                  ? "text-primary"
                  : isApproaching
                    ? "text-primary"
                    : "text-muted-foreground",
              )}
            >
              {format(data.deadline, "MMM dd, yyyy")}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              <span className="font-medium">
                {data.status === "active"
                  ? "Applied At"
                  : data.status === "renewal"
                    ? "Renewed At"
                    : "Last Applied"}
              </span>
            </div>
            <span className="text-muted-foreground text-sm">
              {format(data.appliedAt, "MMM dd, yyyy")}
            </span>
          </div>
          {data.status !== "for-renewal" && (
            <div>{renderStatusRow(data.status, data.updatedAt)}</div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3">
        <div className="w-full pt-3">
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            <Link href={`${""}/${data.applicationId}`} className="flex-1">
              <Button
                size="lg"
                variant="default"
                className="w-full cursor-pointer font-medium"
              >
                View Program
              </Button>
            </Link>

            {["renewal", "inactive"].includes(data.status) && (
              <Button
                variant="outline"
                disabled
                className={cn(
                  "cursor-not-allowed",
                  data.status === "renewal"
                    ? "text-blue-600 hover:text-blue-700"
                    : "text-red-600 hover:text-red-700",
                )}
              >
                {data.status === "renewal" ? (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Waiting for Review
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Deactivated
                  </>
                )}
              </Button>
            )}

            {data.status === "for-renewal" && (
              <RenewalForm
                applicationId={data.applicationId}
                documents={data.documents}
                requirements={data.requirements}
              />
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ScholarsProgramCard;
