# AGENTS.md — Contexto general del proyecto

## Qué es
Landing "Contador a tu Servicio" (contador en Turbo, Antioquia) + panel admin + chatbot.
Monorepo Turborepo con un solo workspace publicado:
- `apps/web` — Next.js 16 (App Router), Tailwind v4, lucide-react. Es lo que se despliega.
- `packages/shared` — paquete TS con datos y lógica tributaria (referenciado como `@contador/shared`).

## Comandos
- Dev: `npm run dev`
- Build: `npm run build`
- Tests: `node --experimental-strip-types --test src/__tests__/*.test.ts` desde `packages/shared`

## Estructura clave
- `apps/web/src/app`: layout + secciones (Hero, Services, Automation, HowItWorks, Stats, Tools, Testimonials, About, Contact) y tools `/tools/calendario-dian` y `/tools/simulador-sanciones`.
- **Paneles por rol**: `/admin` (developer, control total: dashboard/sistema, citas, invitaciones, recordatorios, chat) y `/contadora` (operativa: dashboard, citas operable con WhatsApp, clientes, recordatorios, chat). Logins en `/admin/login` y `/contadora/login`; el portal de clientes es `/portal` (invitación por token).
- Auth: `lib/admin-auth.ts` firma JWT con claim `role: developer | contadora` (misma cookie `cn_token` path `/`); `proxy.ts` valida ruta→rol.
- `apps/web/src/components`: Navbar, Footer, LayoutShell, ChatbotWidget, WhatsAppFloat (public) y `admin/` PanelShell + PanelLogin + ChatPanel (paneles).
- `apps/web/src/lib`: `admin-auth.ts`, `security.ts`, `rate-limit.ts` (PostgreSQL `login_attempts`, fallback en memoria), `db.ts`, `storage.ts` (citas con estado `pendiente|confirmada|atendida|cancelada`), `reminders.ts` (vista previa vencimientos), `whatsapp.ts`, y `shared/`.
- `apps/web/src/app/api`: `auth/login-logout`, `admin/*` (citas, invitaciones, recordatorios, health), `contadora/*` (citas PATCH, invitaciones, recordatorios, chat), `contact`, `appointments`, `automation/*`, `chatbot/message`, `health`.
- `proxy.ts` (Next 16; protege `/admin` y `/contadora` con roles), `vercel.json`, `next.config.ts`.
- **Rediseño**: `globals.css` trae utilidades modernas (`.card-modern`, `.card-hover`, `.btn-primary`, `.text-gradient`, `.glass`, `.chip`, `.icon-tile`, `.section-eyebrow/title/sub`, `.reveal`) y `components/ui/Reveal.tsx` + `CountUp.tsx`; fuente display `Plus_Jakarta_Sans` via `--font-display`.

## Convenciones
- Components con export default; alias `@/*` → `apps/web/src/*` y `@contador/shared` → `packages/shared/src/index.ts`.
- Tema Tailwind con tokens en `globals.css` (navy/emerald/gold).
- Rutas API con `NextResponse` + `lib/storage.ts`.

## Datos tributarios
- UVT 2025 = 49.799.
- Calendario DIAN en `packages/shared/src/tributario/calendario-dian.ts`: año gravable 2025, vencimientos ago–oct 2026 por pares de dígitos de NIT (50 grupos). Para actualizarlo el próximo año: reemplazar la tabla de grupos + `anioGravable` y ajustar los tests en `packages/shared/src/__tests__/tributario.test.ts`.

## Deploy a Vercel
- Proyecto `ricardo-dev2/contador-a-tu-servicio`. Vercel CLI solo sube `apps/web` (el workspace `@contador/shared` no se publica), por eso se despliega una copia **staging** autocontenida en `/var/folders/p2/p5kgt89138n_dyk5w17fglf00000gn/T/opencode/contador-deploy/apps/web`, con `@contador/shared` duplicado en `src/lib/shared` y alias en `tsconfig.json`. Desde ahí: `npx vercel deploy --prod --yes`.
- Env vars pendientes en Vercel: `ADMIN_USER`/`ADMIN_PASS`/`ADMIN_SECRET` (login developer 500 sin ellas; en producción exige `ADMIN_SECRET` no vacío), `CONTADORA_USER`/`CONTADORA_PASS` (login contadora), `ADK_BACKEND_URL`/`ADK_API_KEY` (chatbot 503 "en mantenimiento" sin ellas), `DATABASE_URL` (persistencia), `WHATSAPP_*` (notificaciones), `CRON_SECRET` (el cron `/api/automation/reminders` diario 9:00 UTC lo recibe como Bearer).

## Caveats
- `lib/storage.ts` usa PostgreSQL (var `DATABASE_URL`) y cae a JSON en `data/` solo si no hay URL configurada. El schema (tablas `appointments`, `invitations`, `login_attempts`) se crea solo (`CREATE TABLE IF NOT EXISTS`); también está en `infrastructure/docker/init.sql`.
- Notificaciones a la contadora por WhatsApp Cloud API exigen plantillas aprobadas (`WHATSAPP_TEMPLATE_CITA` / `WHATSAPP_TEMPLATE_INVITACION` / `WHATSAPP_TEMPLATE_RECORDATORIO`); el envío nunca bloquea el registro de la cita.
- `rate-limit.ts` usa la tabla `login_attempts` (multi-instancia); sin `DATABASE_URL` cae a memoria (solo 1 instancia).
- `proxy.ts` corre en runtime `nodejs` (Next 16 no permite edge en proxy). `ADMIN_SECRET` debe configurarse en producción.
- En Vercel (serverless) el fallback JSON de `lib/storage.ts` es efímero; configurar `DATABASE_URL` (Neon/Postgres).
- Lint usa `eslint-config-next` flat (`eslint.config.mjs`); NO mezclar `@eslint/js` manualmente (rompe `no-undef`).
- El repo vive en Desktop/iCloud: los archivos `dataless` cuelgan `bash`/`node` (cat, node, tsc, grep fallan o tardan). Verificar typecheck/lint en una copia local `/var/folders/.../T/opencode/<dir>` + `npm install`. Preferir la herramienta Read/Edit para leerlos; Vercel CLI solo funciona desde FS local (el staging de arriba).
