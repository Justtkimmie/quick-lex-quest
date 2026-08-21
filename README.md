# Internal Onboarding Hub

A polished internal tool that helps new employees learn the company's software stack, track onboarding progress, and find the right resources — plus a research-strategy reference page for short, focused study blocks.

Built with TanStack Start, React 19, TypeScript and Tailwind CSS v4.

## Features

- **Onboarding dashboard** — add new joiners, see aggregate task/document stats, search, filter by status, sort, and export to CSV.
- **Per-hire checklist** — 15 phased tasks (pre-start through 30 days) with per-phase progress, "mark phase done", overdue and at-risk flags, and printable output.
- **Document tracker** — 8 standard documents cycling through outstanding → received → verified.
- **Tool directory data layer** — five internal tools (Slack, Notion, Jira, GitHub, Salesforce) with owner, access requirements, provisioning time, documentation links, and team/role targeting.
- **Onboarding modules** — step-by-step guides with checklists and knowledge-check quizzes, assigned by team and role.
- **Resource hub** — policies, system guides, training material and key contacts.
- **Research strategy page** — sprint types, source hierarchy, fast triage rules, a note template and a weekly schedule.

Data is stored locally in the browser (`localStorage`) — this is a prototype with no backend.

## Getting started

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

The app runs at `http://localhost:8080`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the project |
| `npm run format` | Format with Prettier |

## Project structure

```
src/
  routes/                 File-based routes (TanStack Router)
    __root.tsx            App shell and navigation
    index.tsx             Research strategy page
    resources.tsx         Resource hub
    onboarding/           Admin dashboard and per-hire detail
  lib/
    onboarding-store.ts   Hires, tasks, documents + localStorage persistence
    hub/data.ts           Teams, roles, users, tools and onboarding modules
  styles.css              Design tokens, typography and utilities
```

Routes are file-based: each `.tsx` file under `src/routes` maps to a URL. `routeTree.gen.ts` is generated — do not edit it by hand.

## Design system

All colours, fonts and shadows are semantic tokens defined in `src/styles.css`: a warm archival palette in `oklch`, `Instrument Serif` for display type and `Work Sans` for body text. Components use those tokens rather than hardcoded colour utilities.

## Built with

- TanStack Start + TanStack Router
- React 19 and TypeScript
- Tailwind CSS v4
- shadcn/ui (Radix primitives)
- Vite
