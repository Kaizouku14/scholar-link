import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { UTApi } from "uploadthing/server";

const utApi = new UTApi({
  token: env.UPLOADTHING_TOKEN,
});

export const deleteFileIfExists = async (fileKey: string) => {
  try {
    await utApi.deleteFiles(fileKey);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete file",
    });
  }
};
