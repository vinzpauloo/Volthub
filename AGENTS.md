# AGENTS.md - Volthub Project Guide

## Project Overview

**Volthub** (package: `volthub-ev`) is a Next.js 15 marketing site for an EV (electric vehicle) product/charging company. Built with the App Router, Tailwind CSS v4, Radix UI primitives, GSAP animations, and an Ollama-powered AI chatbot (RAG) for customer support.

## Tech Stack

- **Framework**: Next.js 15.5.7 (App Router, Turbopack)
- **Language**: TypeScript 5, React 19
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), `tw-animate-css`
- **UI**: Radix UI primitives, lucide-react, react-icons
- **Animation**: GSAP + `@gsap/react`, Embla Carousel
- **Charts**: ECharts
- **Themes**: `next-themes`
- **Email**: Resend
- **Testing**: Playwright (e2e)
- **Lint**: ESLint 9 with `next/core-web-vitals` + `next/typescript`
- **Package manager**: pnpm (pnpm-lock.yaml present)

## Scripts

- `pnpm dev` / `pnpm dev:host` — start dev server (Turbopack)
- `pnpm build` — production build
- `pnpm lint` — run ESLint
- `pnpm test:e2e` / `pnpm test:e2e:ui` — Playwright tests
- `pnpm typecheck` — **NOT defined**; run `tsc --noEmit` directly

## Directory Layout

```
src/
  app/         # Next.js App Router pages and routes
    api/       # Route handlers (e.g. /api/chat for Ollama RAG)
    products/[id]/  # Dynamic product detail page
    partners/components/  # Partner section components
  components/  # Reusable UI components
  lib/         # Shared utilities
public/        # Static assets
e2e/           # Playwright tests
```

## Path Aliases

- `@/*` maps to `./src/*` (configured in `tsconfig.json`)

## Coding Conventions

- **No comments** unless explicitly requested
- Use existing libraries (Radix, lucide-react, class-variance-authority, tailwind-merge) — check `src/components` for established patterns before introducing new deps
- Follow existing file/component naming in `src/components` and `src/app`
- Strict TypeScript — fix type errors, don't suppress with `any`
- Respect App Router conventions (server vs client components)
- Tailwind v4 — utilities only, no `tailwind.config.js`; theme via CSS

## Validation

Before declaring work complete:
1. `pnpm lint`
2. `pnpm build` (or `pnpm typecheck` via `tsc --noEmit` for faster feedback)

## Environment

Marketing tag IDs and Ollama config live in `.env.local`. See `README.md` for required `NEXT_PUBLIC_*` variables and `OLLAMA_BASE_URL` / `OLLAMA_MODEL` for the chatbot.

## Marketing / Analytics

Public env vars to enable in Vercel: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_UET_ID`, `NEXT_PUBLIC_META_PIXEL_ID`.

## AI Chatbot

RAG-based support chatbot at `/api/chat` (GET = health, POST = chat). Uses Ollama. Indexes product info, company info, categories, pricing, warranty, and installation details. Knows the current product page context.