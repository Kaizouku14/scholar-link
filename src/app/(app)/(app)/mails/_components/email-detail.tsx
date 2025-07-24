"use client";

import {
  ArrowLeft,
  RotateCw,
  Reply,
  Mail,
  Clock,
  CircleCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, differenceInSeconds, format } from "date-fns";
import { useState } from "react";
import ReplyForm from "./form/reply-form";
import type { Email } from "@/types/email";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import EmptyState from "./helper/no-selected";

interface EmailDetailProps {
  thread?: Email[];
  currentUserId?: string;
  isfetching?: boolean;
  refresh: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  refetch?: () => Promise<any>;
}

const EmailDetail = ({
  thread,
  currentUserId,
  isfetching,
  refresh,
  showBackButton = false,
  onBack,
  refetch,
}: EmailDetailProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => setShowReplyForm(true);
  const handleReplyClose = () => setShowReplyForm(false);

  const lastMessage = thread?.[thread.length - 1];

  return (
    <div className="bg-background border-border flex h-full flex-col rounded-r-xl border">
      {isfetching ? (
        <>
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center space-x-3">
              {showBackButton && (
                <Button variant="ghost" size="sm" disabled>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <Skeleton className="h-6 w-64" />
            </div>
            <RotateCw className="text-muted-foreground h-4 w-4 animate-spin" />
          </div>
          <Skeleton className="mx-6 mb-6 h-full" />
        </>
      ) : !thread || thread.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="bg-muted/20 flex items-center justify-between border-b px-6 py-4">
            <div className="flex min-w-0 flex-1 items-center space-x-3">
              {showBackButton && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <h1 className="flex space-x-1 truncate text-lg">
                    <span className="text-foreground font-semibold">
                      Subject :
                    </span>
                    <span className="font-medium">{thread[0]?.subject}</span>
                  </h1>
                </div>
                <div className="text-muted-foreground mt-1 flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>
                      {thread.length} message{thread.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  {lastMessage?.createdAt && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        Last reply{" "}
                        {formatDistanceToNow(new Date(lastMessage.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={refresh}
              disabled={isfetching}
              className="shrink-0"
            >
              <RotateCw
                className={cn("h-4 w-4", isfetching && "animate-spin")}
              />
            </Button>
          </div>

          <ScrollArea className="h-[700px]">
            <div className="space-y-4 px-6 py-6">
              {thread
                .slice()
                .sort((a, b) => {
                  const dateA = a.createdAt
                    ? new Date(a.createdAt).getTime()
                    : 0;
                  const dateB = b.createdAt
                    ? new Date(b.createdAt).getTime()
                    : 0;
                  return dateB - dateA; // descending: newest to oldest
                })
                .map((email, idx) => {
                  const isSenderCurrentUser = email.sender === currentUserId;
                  const senderName = email.senderName || "Unknown User";
                  const senderEmail = email.senderEmail;
                  const senderProfile = email.senderProfile;
                  const isLastMessage = idx === thread.length - 1;
                  const isFirstMessage = idx === 0;

                  return (
                    <Card
                      key={email.id}
                      className={cn(
                        "shadow-sm transition-all duration-200 hover:shadow-md",
                        isLastMessage && "ring-primary/20 ring-2",
                      )}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={senderProfile ?? undefined}
                                  alt={senderName}
                                />
                                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                                  {senderName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <CardTitle className="text-foreground text-base font-semibold">
                                  {isSenderCurrentUser ? "You" : senderName}
                                </CardTitle>
                                {isLastMessage && (
                                  <Badge
                                    variant="secondary"
                                    className="px-2 py-0 text-xs"
                                  >
                                    Original
                                  </Badge>
                                )}
                                {isFirstMessage && (
                                  <Badge
                                    variant="secondary"
                                    className="px-2 py-0 text-xs"
                                  >
                                    New
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="text-muted-foreground text-sm">
                                {senderEmail}
                              </CardDescription>
                            </div>
                          </div>

                          <div className="space-y-1 text-right">
                            <div className="text-foreground text-sm font-medium">
                              {email.date &&
                                format(new Date(email.date), "MMM dd, yyyy")}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {email.createdAt
                                ? differenceInSeconds(
                                    new Date(),
                                    new Date(email.createdAt),
                                  ) < 60
                                  ? "Just now"
                                  : formatDistanceToNow(
                                      new Date(email.createdAt),
                                      { addSuffix: true },
                                    )
                                : ""}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="from-border via-border/50 h-px bg-gradient-to-r to-transparent" />
                        <div className="h-52 overflow-auto">
                          <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                            {email.content}
                          </p>
                        </div>

                        <div className="bg-muted/20 -mx-6 mt-6 -mb-6 flex items-center justify-between border-t px-6 py-4">
                          <div className="text-muted-foreground text-xs">
                            {thread.length > 1
                              ? `${thread.length} messages in this thread`
                              : "Start of conversation"}
                          </div>
                          <div className="flex items-center space-x-2">
                            {email.isRead && isSenderCurrentUser && (
                              <Badge
                                variant="secondary"
                                className="px-2 py-0 text-xs"
                              >
                                Read
                              </Badge>
                            )}
                            {!isSenderCurrentUser && (
                              <Button
                                onClick={handleReplyClick}
                                className="flex cursor-pointer items-center space-x-2 shadow-sm"
                              >
                                <Reply className="h-4 w-4" />
                                Reply
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </ScrollArea>

          {showReplyForm && lastMessage && (
            <ReplyForm
              thread={thread}
              recipientName={
                lastMessage.sender === currentUserId
                  ? (lastMessage.receiverName ?? "")
                  : (lastMessage.senderName ?? "")
              }
              recipientEmail={
                lastMessage.sender === currentUserId
                  ? (lastMessage.receiverEmail ?? "")
                  : (lastMessage.senderEmail ?? "")
              }
              currentUserId={currentUserId!}
              isOpen={showReplyForm}
              onClose={handleReplyClose}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EmailDetail;
