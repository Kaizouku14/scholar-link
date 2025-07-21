"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, RotateCw } from "lucide-react";
import type { Email } from "@/types/email";

interface ReplyFormProps {
  email: Email;
  recipientName?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const ReplyForm = ({
  email,
  recipientName,
  onCancel,
  onSuccess,
}: ReplyFormProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendReply = async () => {
    if (!replyContent.trim()) return;

    setIsSending(true);
  };

  return (
    <div className="bg-muted/30 border-border space-y-3 border-t p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Reply to {recipientName}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={isSending}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Textarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder={`Write your reply to ${recipientName}...`}
        className="min-h-[120px] resize-none"
        disabled={isSending}
        autoFocus
      />

      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-xs">
          Press{" "}
          <kbd className="bg-muted rounded px-1 py-0.5 text-xs">Ctrl+Enter</kbd>{" "}
          to send,{" "}
          <kbd className="bg-muted rounded px-1 py-0.5 text-xs">Esc</kbd> to
          cancel
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel} disabled={isSending}>
            Cancel
          </Button>
          <Button
            onClick={handleSendReply}
            disabled={!replyContent.trim() || isSending}
          >
            {isSending ? (
              <div className="flex items-center gap-1">
                <RotateCw className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyForm;
