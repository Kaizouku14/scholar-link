"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Reply,
  Forward,
  Archive,
  Trash2,
  ArrowLeft,
  RotateCw,
} from "lucide-react";
import type { Email } from "@/types/email";
import { differenceInSeconds, formatDistanceToNow, format } from "date-fns";
import { getEmailDisplayInfo } from "./helper/email-utils";
import { api } from "@/trpc/react";

interface EmailDetailProps {
  email?: Email;
  showBackButton?: boolean;
  onBack?: () => void;
  currentUserId?: string;
  isfetching?: boolean;
  isRefreshing: boolean;
}
const EmailDetail = ({
  email,
  showBackButton = false,
  onBack,
  currentUserId,
  isfetching,
  isRefreshing,
}: EmailDetailProps) => {
  const displayInfo = getEmailDisplayInfo(email, currentUserId);

  const { mutateAsync: ArchivedMail } = api.mail.archivedMail.useMutation();

  const handleArchivedMail = async () => {
    if (email) await ArchivedMail({ id: email.id });
  };

  return (
    <div className="bg-background border-border flex h-full flex-col rounded-r-xl border">
      {isRefreshing || isfetching ? (
        <div className="border-border flex h-full items-center justify-center rounded-r-xl border">
          <RotateCw className="text-muted-foreground h-6 w-6 animate-spin" />
        </div>
      ) : !email ? (
        <div className="text-muted-foreground flex h-full w-full items-center justify-center text-center">
          No email selected.
        </div>
      ) : (
        <>
          <div className="bg-background border-border flex h-full flex-col rounded-r-xl border">
            <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border rounded-tr-xl border-b p-4 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {showBackButton && (
                    <Button variant="ghost" size="sm" onClick={onBack}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  <h1 className="line-clamp-1 flex-1 text-lg font-semibold">
                    {email?.subject}
                  </h1>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleArchivedMail}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={displayInfo.profile ?? undefined}
                    alt={displayInfo.name ?? undefined}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {displayInfo.fallback}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-medium">
                        {displayInfo.label}: {displayInfo.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {displayInfo.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-sm">
                        {email.date &&
                          format(new Date(email.date), "MMM dd, yyyy")}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {email.createdAt
                          ? differenceInSeconds(
                              new Date(),
                              new Date(email.createdAt),
                            ) < 60
                            ? "Just now"
                            : formatDistanceToNow(new Date(email.createdAt), {
                                addSuffix: true,
                              })
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ScrollArea className="h-[595px]">
              <div className="p-6">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {email?.content}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border rounded-b-xl border-t p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button>
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                  <Button variant="outline">
                    <Forward className="mr-2 h-4 w-4" />
                    Forward
                  </Button>
                </div>

                <div className="text-muted-foreground hidden items-center space-x-2 text-sm sm:flex">
                  <span>1 of {5} messages</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailDetail;
