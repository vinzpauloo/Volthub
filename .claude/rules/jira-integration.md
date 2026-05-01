# Jira Integration — VoltHub Project (Shared Scope)

## Connection Details
- **Cloud ID**: `7c47070c-6963-412e-9fdd-7a9aaba3da33`
- **Project Key**: `VH`
- **Project ID**: `10099`
- **Site**: `fundamental-it.atlassian.net`
- **Issue Type**: Task (id: 10007), Sub-task (id: 10008)
- **Project Type**: Company-managed business (classic)

## Shared Scope — Two Sibling Repos (READ FIRST)

The VH project is shared between two sibling repos on this machine:

| Repo | Scope | Branch |
|------|-------|--------|
| `~/Documents/volthub-app` | Mobile (Expo) + Admin (Next.js) + Backend (NestJS) | `development` |
| `~/Documents/volthub` | Marketing site at https://volthub.ph (Vercel) | `main` |

The **scope of the ticket** — its labels — determines which repo to work in:

- Tickets labeled `mobile`, `admin`, `backend`, `ocpp`, `infra`, `simulator`,
  or `shared` → live in `volthub-app`.
- Tickets labeled `website` → live in `volthub`.

**If the scope is ambiguous, STOP and ask** before creating a branch, fetching
files, generating a spec, or calling a Jira transition. Ambiguous includes:

- A ticket with no app label at all.
- A ticket with labels from both repo groups (e.g., `website` + `admin`).
- A ticket the user references by ID alone, where you haven't yet read the
  ticket body or labels.

`BT-N` belongs to the sibling `bticket` project on the same Atlassian Cloud and
is **foreign to both repos here**. Do not generate any artifact (spec, branch,
ticket lookup, transition, memory entry) for `BT-` prefixes from either repo.
If a `BT-` ID surfaces in volthub-app or volthub cwd, the user is in the wrong
worktree — switch to `~/Documents/bticket` before acting.

Skills that auto-trigger on ticket IDs (`/spec`, `/spec-generator`, `/run-spec`,
`/jira-sync` if/when added, etc.) MUST respect this rule: STOP and ask if the
detected prefix is not `VH-`, OR if the VH ticket's scope is ambiguous from
the cwd alone.

Cross-project references inside commit messages and PR descriptions are still
allowed (e.g., "fixes BT-389 regression in shared Drizzle pattern") — they
never trigger ticket actions in either VoltHub repo.

## Branch Naming Convention
Format: `VH-<id>/<type>/<short-description>`

```
VH-42/feature/seo-meta-fix
VH-105/fix/contact-form-validation
VH-7/chore/update-deps
VH-18/hotfix/typeerror-on-pricing
```

Regex: `^VH-[0-9]+/(feature|fix|hotfix|chore|refactor|docs|test|perf|ci|build|style)/`

**Exempt branches** (no VH-ID required): `develop`, `development`, `staging`, `production`, `main`, `master`

## Commit Message Convention
Format: `VH-<id>: <type>(<scope>): <description>`

```
VH-42: feat(website): add product comparison page
VH-105: fix(contact): validate email regex client-side
VH-7: chore(deps): bump tailwindcss to 4.1
```

The ticket ID is auto-extracted from the current branch name. When on a `VH-*`
branch, always prefix commits with the ticket ID.

## Status Mapping

| Event | Jira Status |
|-------|-------------|
| Task created / available | To Do |
| Task claimed by engineer | In Progress |
| Task blocked | ON HOLD/BLOCKED |
| PR created | Pull Request |
| PR merged to main / development | QA |
| Deployed to staging | Staging |
| Promoted to production | Ready for Release |
| Released & verified | Done |

> Note: VoltHub's board ships with To Do / In Progress / Done. Add the
> additional columns (ON HOLD/BLOCKED, Pull Request, QA, Staging, Ready for
> Release) in Project settings → Board → Columns when needed. The mapping
> above is the target shape; until columns exist, transitions go to the
> closest existing status.

### Same-Session Production Deploy — Skip Intermediate Statuses
When a ticket goes from PR → staging → production → E2E-verified inside one
session, set Jira straight to **Done**. The pipeline statuses (QA, Staging, Ready
for Release) exist to track work in flight — if the work is already shipped and
verified, marching through them adds noise and misreports state. Match Jira to
the actual deployment state, not the theoretical pipeline step.

## App Labels (Required)
Every Jira ticket MUST have at least one app label so engineers can filter by
area AND so cross-repo scope is unambiguous (see Shared Scope — Two Sibling
Repos above). The unified registry:

| Label | Repo | Scope |
|-------|------|-------|
| `mobile` | volthub-app | Expo mobile app (apps/mobile) |
| `admin` | volthub-app | Next.js admin portal (apps/admin) |
| `backend` | volthub-app | NestJS API + OCPP + worker (apps/backend) |
| `ocpp` | volthub-app | OCPP-specific work (chargers, transport, simulator integration) |
| `infra` | volthub-app | Pulumi @pulumi/gcp, Cloud Run, Vercel, Neon, Upstash, GH Actions |
| `simulator` | volthub-app | tools/ocpp-simulator |
| `shared` | volthub-app | packages/shared (types, Zod validators, constants) |
| `website` | volthub | Marketing site (https://volthub.ph) — pages, components, RAG/chatbot, contact email, SEO |

Tickets can have multiple app labels for cross-cutting work (e.g., `backend` +
`admin` for an API endpoint with admin UI, or `website` + `backend` for a
landing page that needs a new public API). Subsystem labels are intentionally
flat — promote a label only when a folder branches past one file.

Additional status labels: `blocked`, `deferred`, `parked` (disambiguate
ON HOLD/BLOCKED tickets).

When creating Jira tickets, always include the appropriate app label(s) alongside
the `pw:T-ID` label (see Task ID Mapping below).

## Task ID Mapping (Parallel Workflow ↔ Jira)
- **Jira label**: `pw:T068` (searchable via JQL: `labels = "pw:T068"`)
- **Task file frontmatter**: `> **Jira:** VH-42`
- **Idempotency**: Always search `project = VH AND labels = "pw:<task-id>"`
  before creating a Jira ticket — avoids duplicates when a parallel-workflow
  task is re-claimed.

Parallel-workflow files for volthub-app live at
`~/Desktop/tech-docs/volthub-app/parallel/tasks/`. The `volthub` repo does not
yet have a parallel-workflow setup; if added, mirror the convention.

## Jira MCP Tool Usage

### Transition a ticket
```
1. Get transitions: mcp__atlassian__getTransitionsForJiraIssue(cloudId, issueIdOrKey)
2. Find target transition ID from response
3. Transition: mcp__atlassian__transitionJiraIssue(cloudId, issueIdOrKey, transitionId)
```

### Create a ticket
```
mcp__atlassian__createJiraIssue(
  cloudId: "7c47070c-6963-412e-9fdd-7a9aaba3da33",
  projectKey: "VH",
  issueTypeName: "Task",
  summary: "...",
  description: "...",
  contentFormat: "markdown"
)
```

### Add a comment
```
mcp__atlassian__addCommentToJiraIssue(
  cloudId: "7c47070c-6963-412e-9fdd-7a9aaba3da33",
  issueIdOrKey: "VH-42",
  body: "...",
  contentFormat: "markdown"
)
```

### Search issues
```
mcp__atlassian__searchJiraIssuesUsingJql(
  cloudId: "7c47070c-6963-412e-9fdd-7a9aaba3da33",
  jql: "project = VH AND status = 'To Do' ORDER BY priority"
)
```

### Look up user for assignment
```
mcp__atlassian__lookupJiraAccountId(cloudId, searchString: "engineer@email.com")
```

## Priority Mapping
| Internal | Jira Priority |
|----------|---------------|
| P0, P0/URGENT | Critical |
| P1, HIGH | High |
| P2, MED, MEDIUM | Medium |
| P3, LOW | Low |
| (unspecified) | Medium |
