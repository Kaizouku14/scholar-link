"use client";

import { differenceInSeconds, format, formatDistanceToNow } from "date-fns";
import { Reply } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EmailMessageCardProps } from "@/interfaces/email/email";

const EmailMessageCard = ({
  email,
  isNewest,
  isOldest,
  isSenderCurrentUser,
  threadLength,
  onReplyClick,
}: EmailMessageCardProps) => {
  return (
    <Card
      key={email.id}
      className={cn(
        "border-border bg-card relative border transition-all duration-200 hover:shadow-md",
        isNewest && "border-l-primary border-l-4 shadow-sm",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="ring-border h-12 w-12 ring-2">
              <AvatarImage
                src={email.senderProfile ?? undefined}
                alt={email.senderName ?? "unknown"}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {email.senderName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-foreground text-base font-semibold">
                  {isSenderCurrentUser ? "You" : email.senderName}
                </CardTitle>
                {isOldest && (
                  <Badge variant="secondary" className="px-2 py-0 text-xs">
                    Original
                  </Badge>
                )}
                {isNewest && (
                  <Badge
                    variant="outline"
                    className="border-primary text-primary px-2 py-0 text-xs"
                  >
                    New
                  </Badge>
                )}
              </div>
              <CardDescription className="text-muted-foreground text-sm">
                {email.senderEmail}
              </CardDescription>
            </div>
          </div>

          {/* Right: Timestamps */}
          <div className="space-y-1 text-right">
            <div className="text-foreground text-sm font-medium">
              {email.date && format(new Date(email.date), "MMM dd, yyyy")}
            </div>
            <div className="text-muted-foreground text-xs">
              {email.createdAt
                ? differenceInSeconds(new Date(), new Date(email.createdAt)) <
                  60
                  ? "Just now"
                  : formatDistanceToNow(new Date(email.createdAt), {
                      addSuffix: true,
                    })
                : ""}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="from-border via-border/40 h-px w-full bg-gradient-to-r to-transparent" />

        <div className="bg-muted/20 max-h-56 overflow-auto rounded-md p-3">
          <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
            {email.content}
          </p>
        </div>

        <div className="bg-muted/30 -mx-6 mt-6 -mb-6 flex items-center justify-between border-t px-6 py-3">
          <div className="text-muted-foreground text-xs">
            {threadLength > 1
              ? `${threadLength} messages in this thread`
              : "Start of conversation"}
          </div>
          <Button
            onClick={onReplyClick}
            className="bg-primary text-primary-foreground flex items-center gap-1 shadow-sm hover:shadow-md hover:brightness-110"
          >
            <Reply className="h-4 w-4" />
            Reply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailMessageCard;
