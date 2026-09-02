import { isDbEnabled, getPool, withDb } from "./db";

const WINDOW_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export interface RateLimitResult {
  limited: boolean;
  retryAfterSeconds: number;
}

/* ---------- Estrategia en memoria (fallback sin DATABASE_URL) ---------- */

const buckets = new Map<string, { count: number; resetAt: number }>();

function consumeMemory(key: string, now: number): RateLimitResult {
  const current = buckets.get(key);

  if (!current || now >= current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, retryAfterSeconds: 0 };
  }

  current.count += 1;
  if (current.count > MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((current.resetAt - now) / 1000)
    );
    return { limited: true, retryAfterSeconds };
  }

  return { limited: false, retryAfterSeconds: 0 };
}

/* ---------- Estrategia en PostgreSQL (multi-instancia) ---------- */

async function consumeDatabase(key: string): Promise<RateLimitResult> {
  const pool = getPool();
  const now = Date.now();

  const { rows } = await pool.query<{
    count: string;
    reset_at: string;
  }>(
    `SELECT count, reset_at FROM login_attempts WHERE key = $1 FOR UPDATE`,
    [key]
  );

  const existing = rows[0];

  if (existing && Number(existing.reset_at) > now) {
    const newCount = Number(existing.count) + 1;
    if (newCount > MAX_ATTEMPTS) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((Number(existing.reset_at) - now) / 1000)
      );
      return { limited: true, retryAfterSeconds };
    }
    await pool.query(
      `UPDATE login_attempts SET count = $1 WHERE key = $2`,
      [newCount, key]
    );
    return { limited: false, retryAfterSeconds: 0 };
  }

  if (existing) {
    await pool.query(
      `UPDATE login_attempts SET count = 1, reset_at = $1 WHERE key = $2`,
      [now + WINDOW_MS, key]
    );
  } else {
    try {
      await pool.query(
        `INSERT INTO login_attempts (key, count, reset_at) VALUES ($1, 1, $2)`,
        [key, now + WINDOW_MS]
      );
    } catch {
      // Concurrencia: la fila ya existe; se reintenta como update.
      await pool.query(
        `UPDATE login_attempts SET count = 1, reset_at = $1 WHERE key = $2`,
        [now + WINDOW_MS, key]
      );
    }
  }

  return { limited: false, retryAfterSeconds: 0 };
}

/* ---------- Punto de entrada ---------- */

export async function consumeRateLimit(key: string): Promise<RateLimitResult> {
  if (!isDbEnabled()) {
    return consumeMemory(key, Date.now());
  }
  return withDb(async () => consumeDatabase(key));
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}