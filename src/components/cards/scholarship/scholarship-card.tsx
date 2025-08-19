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
import {
  ShieldCheck,
  ShieldX,
  MapPin,
  Calendar,
  Users,
  FileText,
  FolderMinus,
} from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import type { QueryObserverResult } from "@tanstack/react-query";
import { format } from "date-fns";
import ActivateProgram from "../../dialog/activate-program";
import type { submissionType } from "@/constants/submittion-type";
import { isDeadlineApproaching, isDeadlinePassed } from "@/lib/utils";

interface ScholarshipCardProps {
  programId: string;
  name: string;
  imageUrl: string | null;
  slots: number;
  deadline: Date;
  isActive: boolean;
  location: string;
  type: string;
  description: string;
  submissionType: submissionType;
}

const ScholarshipCard = ({
  data,
  refetch,
}: {
  data: ScholarshipCardProps;
  refetch: () => Promise<
    QueryObserverResult<ScholarshipCardProps[] | undefined, unknown>
  >;
}) => {
  const { mutateAsync: disableProgram } =
    api.scholarships.disableScholarshipProgram.useMutation();

  const handleDisableProgram = () => {
    toast.promise(
      disableProgram({
        programId: data.programId,
      }),
      {
        loading: "disabling scholarship program status...",
        success: () => {
          refetch();
          return "Scholarship program status disabled successfully!";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      },
    );
  };

  return (
    <Card
      className={`mx-auto w-full transition-all duration-200 hover:shadow-lg ${
        !data.isActive ? "bg-muted/30 opacity-75" : ""
      }`}
    >
      <CardHeader className="flex items-start space-y-0 pb-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-1 items-center space-x-3">
            <Avatar className="border-background h-12 w-12 border-2 shadow-sm">
              <AvatarImage
                src={data.imageUrl || undefined}
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
                {isDeadlineApproaching(data.deadline) && (
                  <Badge variant="destructive" className="text-xs">
                    Deadline Soon
                  </Badge>
                )}
                {isDeadlinePassed(data.deadline) && (
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
          <Button size={"icon"} variant={"outline"} className="cursor-pointer">
            <FolderMinus className="h-5 w-5" />
          </Button>
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
                isDeadlinePassed(data.deadline)
                  ? "text-destructive"
                  : isDeadlineApproaching(data.deadline)
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

          <div className="flex items-center justify-between py-1">
            <div className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Location:</span>
            </div>
            <span className="line-clamp-1 max-w-[60%] text-right font-medium">
              {data.location}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3">
        <div className="w-full border-t">
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              size="lg"
              className="w-full cursor-pointer"
              disabled={isDeadlinePassed(data.deadline)}
            >
              {isDeadlinePassed(data.deadline)
                ? "Application Closed"
                : "View Details"}
            </Button>

            {data.isActive ? (
              <Button
                variant="outline"
                size="lg"
                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 flex w-full cursor-pointer items-center justify-center space-x-2 transition-colors"
                onClick={handleDisableProgram}
              >
                <ShieldX className="h-4 w-4" />
                <span>Deactivate</span>
              </Button>
            ) : (
              <>
                {data && (
                  <ActivateProgram
                    data={{
                      programId: data.programId,
                      deadline: data.deadline,
                      submissionType: data.submissionType,
                      slots: data.slots,
                    }}
                    refetch={refetch}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ScholarshipCard;
