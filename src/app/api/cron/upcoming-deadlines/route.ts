import { env } from "@/env";
import { documentDeadlineNotifier } from "@/lib/api/cron/document-deadline-notifier";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader != `Bearer ${env.CRON_SECRET}`) {
      return NextResponse.json(
        {
          error: "UNAUTHORIZED" + env.CRON_SECRET,
        },
        { status: 400 },
      );
    }

    const response = await documentDeadlineNotifier();

    return NextResponse.json({
      success: true,
      notificationsSent: response.length,
      message: `Sent notifications to ${response.length} students`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
