# Contador a tu Servicio — Landing Page

Landing page mejorada para la firma contable **CONTADOR A TU SERVICIO** en Turbo, Antioquia, Colombia.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Turborepo
- Prisma + PostgreSQL

## Scripts

```bash
npm run dev       # Desarrollo
npm run build     # Producción
npm run lint      # Lint
npm run typecheck # Type check
```

## Estructura

```
apps/web/          -> App Next.js (landing + portal + admin)
packages/shared/   -> Datos compartidos, lógica tributaria, IA, automatización
infrastructure/    -> Docker, Bicep (Azure)
```

## Color palette

- Navy: `#0c1f3f` / `#1a3560`
- Emerald: `#059669` / `#10b981`
- Gold: `#c9a227` / `#e4c76a`

## Funcionalidades

- Landing page con 10 secciones
- 5 automatizaciones para contadores y usuarios
- Chatbot pluggable (state machine → IA)
- Herramientas DIAN (simulador de sanciones + calendario)
- Escalable para múltiples asistentes de IA