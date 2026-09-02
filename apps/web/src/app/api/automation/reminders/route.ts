import { NextResponse } from "next/server";
import { buildDemoReminders } from "@/lib/reminders";
import { notifyReminderSummary } from "@/lib/whatsapp";
import { safeEqual } from "@/lib/security";

const CRON_SECRET = process.env.CRON_SECRET ?? "";

function isAuthorized(request: Request): boolean {
  if (!CRON_SECRET) return false;

  // Vercel Cron envía el secreto en el header Authorization: Bearer <CRON_SECRET>.
  const auth = request.headers.get("authorization");
  if (auth) {
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (safeEqual(token, CRON_SECRET)) return true;
  }

  // Backward compat: ?secret=<CRON_SECRET>
  const querySecret = new URL(request.url).searchParams.get("secret");
  if (querySecret && safeEqual(querySecret, CRON_SECRET)) return true;

  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reminders = buildDemoReminders();

  let whatsappSent = 0;
  const whatsappResults: Array<{ client: string; sent: boolean; reason?: string }> = [];

  for (const reminder of reminders) {
    const result = await notifyReminderSummary({
      client: reminder.client,
      days: reminder.days,
      fechaLimite: reminder.fechaLimite,
    });
    whatsappResults.push({ client: reminder.client, sent: result.sent, reason: result.reason });
    if (result.sent) whatsappSent += 1;
  }

  return NextResponse.json({
    reminders,
    total: reminders.length,
    whatsappSent,
    whatsappResults,
    timestamp: new Date().toISOString(),
  });
}