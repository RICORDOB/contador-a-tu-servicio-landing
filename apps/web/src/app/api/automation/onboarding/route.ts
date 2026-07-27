import { NextResponse } from "next/server";

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

    return NextResponse.json({
      ok: true,
      message: "Invitación procesada",
      inviteLink: `/registro?token=inv_${Date.now()}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la invitación" },
      { status: 500 }
    );
  }
}