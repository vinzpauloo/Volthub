# Volthub

EV charging solutions marketing website.

## Tech Stack
- **Framework**: Next.js 15.5 (App Router, Turbopack, RSC)
- **React**: 19.1
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui (new-york style)
- **Animation**: GSAP + @gsap/react
- **Charts**: ECharts 6
- **Carousel**: Embla Carousel
- **Icons**: Lucide React, React Icons
- **Theme**: next-themes (dark/light)
- **Email**: Nodemailer
- **Package Manager**: pnpm

## Key Commands
```bash
pnpm dev              # Dev server (Turbopack)
pnpm dev:host         # Dev server on LAN
pnpm build            # Production build (Turbopack)
pnpm start            # Start production server
pnpm lint             # ESLint
npx tsc --noEmit      # Type check
```

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (home)/             # Homepage (route group)
│   ├── about/
│   ├── blog/
│   ├── case-studies/
│   ├── contact/
│   ├── pricing/
│   ├── products/
│   ├── sectors/
│   ├── services/
│   ├── solutions/
│   ├── api/                # API routes (chat, contact, products)
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── common/             # Shared components
│   ├── layout/             # Layout components (header, footer)
│   ├── home/               # Homepage-specific components
│   ├── marketing/          # Marketing components
│   └── provider/           # Context providers
└── lib/
    ├── utils.ts            # Utility functions (cn, etc.)
    ├── chatbot.ts          # Chatbot logic
    └── rag/                # RAG implementation
```

## Path Aliases
- `@/*` → `./src/*`

## Conventions
- shadcn/ui components in `components/ui/`
- Page-specific components co-located in page directories
- API routes in `app/api/`
- Feature config: `typedRoutes: true` in next.config.ts
- Remote images allowed from `readdy.ai`

## Validation
After writing or editing code, always run these checks before considering work complete:
```bash
npx tsc --noEmit      # Type check — must pass with zero errors
pnpm lint             # ESLint — fix all warnings/errors
pnpm build            # Build — verify production build succeeds
```
- Run type check (`tsc --noEmit`) after every logical unit of work
- Run lint (`pnpm lint`) after every logical unit of work
- Run build (`pnpm build`) before marking any feature/task as complete
- Never leave type errors or lint warnings unresolved

## SEO
- Active SEO optimization across all pages (recent commits)
- Metadata managed per-page

## Jira Integration
- **Project**: VoltHub (`VH`) on `fundamental-it.atlassian.net` — cloudId `7c47070c-6963-412e-9fdd-7a9aaba3da33`, projectId `10099`. **Shared with `~/Documents/volthub-app`.**
- **Rules**: `.claude/rules/jira-integration.md` — full conventions, shared scope clause, status mapping, app labels, MCP tool examples.
- **Hooks**: `.claude/hooks/jira-branch-guard.sh` blocks branches not matching `^VH-[0-9]+/...`; `.claude/hooks/jira-commit-prefix.sh` reminds to prefix commits with the branch's `VH-N` ID.
- **Branch format**: `VH-<id>/<type>/<description>` (e.g., `VH-42/feature/seo-meta-fix`)
- **Commit format**: `VH-<id>: <type>(<scope>): <description>`
- **Repo scope**: marketing site at https://volthub.ph. Tickets labeled `website` belong here. Tickets labeled `mobile|admin|backend|ocpp|infra|simulator|shared` belong in `~/Documents/volthub-app`. **No-label or mixed-label tickets are ambiguous — STOP and ask.** `BT-` is foreign — never act on it from this repo.
