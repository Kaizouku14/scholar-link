import type { mailTable } from "@/server/db/schema/mail";
import type { InferSelectModel } from "drizzle-orm";

export type Email = InferSelectModel<typeof mailTable> & {
  senderName?: string | null;
  senderMiddleName?: string | null;
  senderSurname?: string | null;
  senderEmail?: string | null;
  senderProfile?: string | null;
  receiverName?: string | null;
  receiverMiddleName?: string | null;
  receiverSurname?: string | null;
  receiverEmail?: string | null;
  receiverProfile?: string | null;
};
