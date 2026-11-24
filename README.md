# PjBL Interactive Media

Web-based Learning Management System for Project Based Learning (PjBL), built for SMK Negeri 1 Patumbak (Grade XI PPLG, Pemrograman Web).

## Stack

TanStack Start, React, TypeScript, Tailwind CSS, shadcn/ui, Drizzle ORM, PostgreSQL, Better Auth.

## Getting started

```sh
pnpm install
docker-compose up -d
# set values from .env.schema in .env.local (including MASTER_NAME, MASTER_NIM, MASTER_PASSWORD)
vpr db migrate
vpr seed:master
vpr dev
```

## Commands

| Command                              | Purpose                           |
| ------------------------------------ | --------------------------------- |
| `vpr dev`                            | Start the dev server              |
| `vpr lint`                           | Lint and type-check               |
| `vpr test`                           | Run unit tests                    |
| `vpr auth:generate`                  | Regenerate the Better Auth schema |
| `vpr db generate` / `vpr db migrate` | Create and apply migrations       |
| `vpr seed:master`                    | Create the first master account   |

## Docs

Architecture and roadmap: `/docs` route.
