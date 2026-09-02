import { promises as fs } from "node:fs";
import path from "node:path";
import { isDbEnabled, getPool, withDb } from "./db";

const DATA_DIR = path.join(process.cwd(), "data");

export type AppointmentStatus = "pendiente" | "confirmada" | "atendida" | "cancelada";

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  "pendiente",
  "confirmada",
  "atendida",
  "cancelada",
];

export interface StoredAppointment {
  id: string;
  guestName: string;
  guestPhone: string;
  serviceType: string;
  scheduledAt: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface StoredInvitation {
  id: string;
  token: string;
  email: string;
  name: string;
  invitedBy?: string;
  createdAt: string;
}

/* ---------- Fallback JSON (solo si no hay DATABASE_URL) ---------- */

async function ensureDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // El directorio ya existe; se ignora.
  }
}

async function readJson<T>(fileName: string, fallback: T[]): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, fileName), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(fileName: string, data: T[]): Promise<void> {
  await ensureDir();
  const target = path.join(DATA_DIR, fileName);
  const tmp = `${target}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, target);
}

/* ---------- Interfaz pública (DB primero, JSON como fallback) ---------- */

export async function listAppointments(): Promise<StoredAppointment[]> {
  if (!isDbEnabled()) return readJson<StoredAppointment>("citas.json", []);

  return withDb(async () => {
    const { rows } = await getPool().query<{
      id: string;
      guest_name: string;
      guest_phone: string;
      service_type: string;
      scheduled_at: string;
      status: string;
      created_at: string;
    }>(`
      SELECT id, guest_name, guest_phone, service_type, scheduled_at, status, created_at
      FROM appointments
      ORDER BY created_at DESC
    `);
    return rows.map((r) => ({
      id: r.id,
      guestName: r.guest_name,
      guestPhone: r.guest_phone,
      serviceType: r.service_type,
      scheduledAt: r.scheduled_at,
      status: (APPOINTMENT_STATUSES as string[]).includes(r.status)
        ? (r.status as AppointmentStatus)
        : "pendiente",
      createdAt: r.created_at,
    }));
  });
}

export async function appendAppointment(
  appointment: Omit<StoredAppointment, "id" | "createdAt" | "status">
): Promise<StoredAppointment> {
  const record: StoredAppointment = {
    ...appointment,
    status: "pendiente",
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  if (!isDbEnabled()) {
    const all = await readJson<StoredAppointment>("citas.json", []);
    all.push(record);
    await writeJson("citas.json", all);
    return record;
  }

  await withDb(async () => {
    await getPool().query(
      `INSERT INTO appointments (id, guest_name, guest_phone, service_type, scheduled_at, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        record.id,
        record.guestName,
        record.guestPhone,
        record.serviceType,
        record.scheduledAt,
        record.status,
        record.createdAt,
      ]
    );
  });

  return record;
}

/** Actualiza el estado de una cita. Devuelve null si no existe. */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<StoredAppointment | null> {
  if (!isDbEnabled()) {
    const all = await readJson<StoredAppointment>("citas.json", []);
    const idx = all.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], status };
    await writeJson("citas.json", all);
    return all[idx];
  }

  return withDb(async () => {
    const { rows } = await getPool().query<{
      id: string;
      guest_name: string;
      guest_phone: string;
      service_type: string;
      scheduled_at: string;
      status: string;
      created_at: string;
    }>(
      `UPDATE appointments
       SET status = $2
       WHERE id = $1
       RETURNING id, guest_name, guest_phone, service_type, scheduled_at, status, created_at`,
      [id, status]
    );
    const r = rows[0];
    if (!r) return null;
    return {
      id: r.id,
      guestName: r.guest_name,
      guestPhone: r.guest_phone,
      serviceType: r.service_type,
      scheduledAt: r.scheduled_at,
      status: r.status as AppointmentStatus,
      createdAt: r.created_at,
    };
  });
}

export async function listInvitations(): Promise<StoredInvitation[]> {
  if (!isDbEnabled()) return readJson<StoredInvitation>("onboarding.json", []);

  return withDb(async () => {
    const { rows } = await getPool().query<{
      id: string;
      token: string;
      email: string;
      name: string;
      invited_by: string | null;
      created_at: string;
    }>(`
      SELECT id, token, email, name, invited_by, created_at
      FROM invitations
      ORDER BY created_at DESC
    `);
    return rows.map((r) => ({
      id: r.id,
      token: r.token,
      email: r.email,
      name: r.name,
      invitedBy: r.invited_by ?? undefined,
      createdAt: r.created_at,
    }));
  });
}

export async function appendInvitation(
  invitation: Omit<StoredInvitation, "id" | "createdAt">
): Promise<StoredInvitation> {
  const record: StoredInvitation = {
    ...invitation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  if (!isDbEnabled()) {
    const all = await readJson<StoredInvitation>("onboarding.json", []);
    all.push(record);
    await writeJson("onboarding.json", all);
    return record;
  }

  await withDb(async () => {
    await getPool().query(
      `INSERT INTO invitations (id, token, email, name, invited_by, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        record.id,
        record.token,
        record.email,
        record.name,
        record.invitedBy ?? null,
        record.createdAt,
      ]
    );
  });

  return record;
}