import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
  pool?: Pool;
  schemaReady?: boolean;
};

export function isDbEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): Pool {
  if (!globalForPg.pool) {
    globalForPg.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : undefined,
      max: 5,
    });
  }
  return globalForPg.pool;
}

async function ensureSchema({ force = false } = {}): Promise<void> {
  if (!isDbEnabled()) return;
  if (globalForPg.schemaReady && !force) return;

  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      guest_name TEXT NOT NULL,
      guest_phone TEXT NOT NULL,
      service_type TEXT NOT NULL DEFAULT '',
      scheduled_at TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS invitations (
      id TEXT PRIMARY KEY,
      token TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      invited_by TEXT,
      created_at TEXT NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      key TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 1,
      reset_at BIGINT NOT NULL
    )
  `);

  globalForPg.schemaReady = true;
}

export async function withDb<T>(fn: () => Promise<T>): Promise<T> {
  await ensureSchema();
  const res = await fn();
  return res;
}

export { ensureSchema };

export async function healthCheck(): Promise<{ ok: boolean; detail: string }> {
  if (!isDbEnabled()) {
    return { ok: false, detail: "DATABASE_URL no configurada" };
  }
  try {
    await ensureSchema({ force: true });
    await getPool().query("SELECT 1");
    return { ok: true, detail: "PostgreSQL conectado" };
  } catch (err) {
    return { ok: false, detail: err instanceof Error ? err.message : "Error" };
  }
}