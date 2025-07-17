import { db } from "@/server/db"
import { mailTable } from "@/server/db/schema/mail"
import { TRPCError } from "@trpc/server"



export const getAllMails = () => {
  try{
    const response = db
        .select({
            id : mailTable.id,
            sender

        })
        .from(mailTable)
        .execute();

  }catch(error){
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all mails," + (error as Error).message
    })
  }
}
