import type { Email } from "@/types/email";

export const getEmailDisplayInfo = (email?: Email, currentUserId?: string) => {
  const isSender = email?.sender === currentUserId;

  if (isSender) {
    return {
      name: email?.receiverName || email?.receiverEmail,
      email: email?.receiverEmail,
      profile: email?.receiverProfile,
      prefix: "To: ",
      label: "To",
      fallback: email?.receiverName?.charAt(0).toUpperCase() ?? "R",
      isSender: true,
    };
  } else {
    return {
      name: email?.senderName || email?.senderEmail,
      email: email?.senderEmail,
      profile: email?.senderProfile,
      prefix: "",
      label: "From",
      fallback: email?.senderName?.charAt(0).toUpperCase() ?? "S",
      isSender: false,
    };
  }
};
