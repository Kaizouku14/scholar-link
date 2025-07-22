"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, RotateCw } from "lucide-react";
import { api } from "@/trpc/react";
import type { Email } from "@/types/email";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface ReplyFormProps {
  thread: Email[];
  recipientName?: string | null;
  recipientEmail?: string | null;
  currentUserId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ReplyForm = ({
  thread,
  recipientName,
  recipientEmail,
  currentUserId,
  isOpen,
  onClose,
  onSuccess,
}: ReplyFormProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { mutateAsync: sendMailToMutation } =
    api.mail.replyToMail.useMutation();
  const lastMessage = thread[thread.length - 1];

  console.log(lastMessage);

  const handleSendReply = async () => {
    if (!replyContent.trim() || !thread) return;

    setIsSending(true);
    try {
      if (!lastMessage) return;

      await sendMailToMutation({
        threadId: lastMessage.threadId,
        parentId: lastMessage.id,
        sender: currentUserId,
        receiver:
          lastMessage?.sender === currentUserId
            ? lastMessage?.receiver
            : lastMessage?.sender,
        subject: lastMessage.subject.startsWith("Re: ")
          ? lastMessage.subject
          : `Re: ${lastMessage.subject}`,
        content: replyContent,
      });
    } catch (error) {
      toast.error("Failed to send reply. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (!isSending) {
      setReplyContent("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-[600px]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <span>Reply to :</span>
            <span className="font-medium">
              {recipientName || recipientEmail}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 space-y-4">
          <div className="bg-muted/30 space-y-2 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Original Message</p>
              <p className="text-muted-foreground text-xs">
                Subject: {lastMessage?.subject}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Your Reply</p>
            </div>

            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder={`Write your reply to ${recipientName || recipientEmail}...`}
              className="min-h-[200px] resize-none"
              disabled={isSending}
              autoFocus
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 justify-end space-x-2 border-t pt-4">
          <Button variant="outline" onClick={handleClose} disabled={isSending}>
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
      </DialogContent>
    </Dialog>
  );
};

export default ReplyForm;
