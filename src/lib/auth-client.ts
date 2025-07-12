import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL:
    (env.NEXT_PUBLIC_BETTER_AUTH_URL as string) ?? "http://localhost:3000",
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});
