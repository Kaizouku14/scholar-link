import { UTApi } from "uploadthing/server";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

const utApi = new UTApi({
  token: env.UPLOADTHING_TOKEN,
});

export const deleteFilesIfExist = async (fileKeys: string | string[]) => {
  const keys = Array.isArray(fileKeys) ? fileKeys : [fileKeys];

  if (keys.length === 0) return;

  try {
    await utApi.deleteFiles(keys);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to delete file(s): " +
        (error instanceof Error ? error.message : String(error)),
    });
  }
};
