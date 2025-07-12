"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Reply,
  Forward,
  Archive,
  Trash2,
  ArrowLeft,
} from "lucide-react";

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  date: string;
  isRead: boolean;
  avatar: string;
}
interface EmailDetailProps {
  email: Email;
  showBackButton?: boolean;
  onBack?: () => void;
}
const EmailDetail = ({
  email,
  showBackButton = false,
  onBack,
}: EmailDetailProps) => {
  return (
    <div className="bg-background border-border flex h-full flex-col rounded-r-xl border">
      {/* Header */}
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border rounded-tr-xl border-b p-4 backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {showBackButton && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="line-clamp-1 flex-1 text-lg font-semibold">
              {email.subject}
            </h1>
          </div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sender Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-sm font-medium">
              {email.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">{email.sender}</p>
                <p className="text-muted-foreground text-sm">
                  {email.senderEmail}
                </p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-sm">{email.date}</p>
                <p className="text-muted-foreground text-sm">
                  {email.timestamp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <ScrollArea className="h-[595px]">
        <div className="p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {email.content}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Action Bar */}
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
            <span>1 of {"69"} messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
