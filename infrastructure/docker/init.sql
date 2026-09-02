-- Esquema de la base de datos para "Contador a tu Servicio".
-- El código crea estas tablas automáticamente (CREATE TABLE IF NOT EXISTS),
-- este archivo existe como referencia y para setups manuales.

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  service_type TEXT NOT NULL DEFAULT '',
  scheduled_at TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pendiente',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS invitations (
  id TEXT PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  invited_by TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS login_attempts (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  reset_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments (created_at);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations (email);