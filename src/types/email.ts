import type { mailTable } from "@/server/db/schema/mail";
import type { InferSelectModel } from "drizzle-orm";

export type Email = InferSelectModel<typeof mailTable>;
