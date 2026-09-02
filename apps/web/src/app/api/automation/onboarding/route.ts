import { NextResponse } from "next/server";
import { appendInvitation } from "@/lib/storage";
import { notifyNewInvitation } from "@/lib/whatsapp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, invitedBy } = body as {
      email: string;
      name: string;
      invitedBy?: string;
    };

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email y nombre son requeridos" },
        { status: 400 }
      );
    }

    const token = `inv_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
    const record = await appendInvitation({
      token,
      email,
      name,
      invitedBy,
    });

    // Notificación a la contadora. Nunca lanza: no afecta el registro de la invitación.
    await notifyNewInvitation(record);

    return NextResponse.json({
      ok: true,
      message: "Invitación procesada",
      inviteLink: `/registro?token=${token}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la invitación" },
      { status: 500 }
    );
  }
}
