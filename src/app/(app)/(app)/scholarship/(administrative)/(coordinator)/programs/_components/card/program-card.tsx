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
import { Calendar, Users, FileText } from "lucide-react";
import type { QueryObserverResult } from "@tanstack/react-query";
import { format } from "date-fns";
import RepostProgram from "../dialog/repost-program";
import { cn, isDeadlineApproaching, isDeadlinePassed } from "@/lib/utils";
import type { Program } from "@/interfaces/scholarship/scholarship-card";
import { PageRoutes } from "@/constants/page-routes";
import Link from "next/link";
import PostAnnouncement from "../dialog/edit-program";

const ProgramCard = ({
  data,
  refetch,
}: {
  data: Program;
  refetch: () => Promise<QueryObserverResult<Program[] | undefined, unknown>>;
}) => {
  const isPassed = isDeadlinePassed(data.deadline);
  const isApproaching = isDeadlineApproaching(data.deadline);

  return (
    <Card
      className={cn(
        "mx-auto w-full shadow-none transition-all duration-200",
        (!data.isActive || isPassed) && "bg-muted/30 opacity-75",
      )}
    >
      <CardHeader className="flex items-start space-y-0 pb-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-1 items-center space-x-3">
            <Avatar className="border-background h-12 w-12 border-2 shadow-sm">
              <AvatarImage
                src={data.imageUrl ?? undefined}
                alt={`${data.name} logo`}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {data.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-lg leading-tight font-semibold">
                {data.name}
              </h3>

              <div className="mt-1 flex items-center gap-2">
                <Badge>{data.type}</Badge>
                <Badge
                  variant={data.isActive ? "default" : "secondary"}
                  className="text-xs"
                >
                  {data.isActive ? "Active" : "Inactive"}
                </Badge>
                {isApproaching && (
                  <Badge variant="destructive" className="text-xs">
                    Deadline Soon
                  </Badge>
                )}
                {isPassed && (
                  <Badge
                    variant="outline"
                    className="text-muted-foreground text-xs"
                  >
                    Expired
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <PostAnnouncement data={data} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {data.description}
        </p>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center justify-between py-1">
            <div className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Application Deadline:</span>
            </div>
            <span
              className={`font-medium ${
                isPassed
                  ? "text-primary"
                  : isApproaching
                    ? "text-primary"
                    : "text-foreground"
              }`}
            >
              {format(data.deadline, "MMM dd, yyyy")}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Submission Type:</span>
            </div>
            <Badge variant="outline" className="text-xs capitalize">
              {data.submissionType}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Available Slots:</span>
            </div>
            <span
              className={`font-medium ${data.slots < 50 ? "text-primary" : "text-foreground"}`}
            >
              {data.slots.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3">
        <div className="w-full border-t">
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href={`${PageRoutes.SCHOLARSHIPS_PROGRAMS_DETAILS}/${data.programId}`} //to change
              className="flex-1"
            >
              <Button size="lg" className="w-full cursor-pointer">
                View Program
              </Button>
            </Link>

            {data && (
              <RepostProgram
                data={{
                  programId: data.programId,
                  deadline: data.deadline,
                  eligibilityType: data.eligibilityType,
                  submissionType: data.submissionType,
                  slots: data.slots,
                  requirements: data.requirements,
                }}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
