import type { mailTable } from "@/server/db/schema/mail";
import type { InferSelectModel } from "drizzle-orm";

export type BaseEmail = InferSelectModel<typeof mailTable>;

export type Email = Omit<BaseEmail, "createdAt" | "date"> & {
  date: string;
  createdAt: string;
};
