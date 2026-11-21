import { createFileRoute } from "@tanstack/react-router";
import { CopyIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "#/components/theme-toggle.tsx";
import { Button } from "#/components/ui/button.tsx";
import { toast } from "#/components/ui/toast.tsx";
import { cn } from "#/lib/utils.ts";

// Place at: src/routes/docs.tsx  → /docs (public, outside the _auth layout)
export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

/* -------------------------------- Navigation ------------------------------- */

type TocItem = { id: string; title: string; level: 1 | 2 };

const TOC_GROUPS: { label: string; items: TocItem[] }[] = [
  {
    label: "Pengantar",
    items: [{ id: "ringkasan", title: "Ringkasan", level: 1 }],
  },
  {
    label: "Analisis",
    items: [
      { id: "analisis", title: "Arsitektur starter", level: 1 },
      { id: "dipertahankan", title: "Dipertahankan", level: 1 },
      { id: "dibuat", title: "Perlu dibuat", level: 1 },
    ],
  },
  {
    label: "Arsitektur",
    items: [
      { id: "arsitektur", title: "Arsitektur PjBL", level: 1 },
      { id: "struktur", title: "Struktur direktori", level: 1 },
    ],
  },
  {
    label: "Template kode",
    items: [
      { id: "template", title: "Tentang template", level: 1 },
      { id: "tpl-types", title: "Tipe domain", level: 2 },
      { id: "tpl-stages", title: "Konstanta enam tahap", level: 2 },
      { id: "tpl-auth", title: "Role di Better Auth", level: 2 },
      { id: "tpl-middleware", title: "requireRole", level: 2 },
      { id: "tpl-schema", title: "Skema proyek", level: 2 },
      { id: "tpl-guard", title: "Guard route per role", level: 2 },
      { id: "tpl-serverfn", title: "Fitur: server function", level: 2 },
      { id: "tpl-lifecycle", title: "Status proyek + tes", level: 2 },
      { id: "tpl-stepper", title: "Komponen StageStepper", level: 2 },
    ],
  },
  {
    label: "Perencanaan",
    items: [
      { id: "roadmap", title: "Roadmap", level: 1 },
      { id: "tugas-pertama", title: "Tugas pertama", level: 1 },
      { id: "keputusan", title: "Keputusan terbuka", level: 1 },
    ],
  },
];

const ALL_IDS = TOC_GROUPS.flatMap((g) => g.items.map((i) => i.id));

function useActiveId(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-64px 0px -70% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function Toc({ active }: { active: string | undefined }) {
  return (
    <nav aria-label="Daftar isi" className="space-y-5 text-sm">
      {TOC_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 px-2 font-semibold">{group.label}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={"#" + item.id}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "block rounded-lg px-2 py-1 text-muted-foreground transition-colors hover:text-foreground",
                    item.level === 2 && "ml-3 rounded-l-none border-l pl-3",
                    active === item.id && "bg-muted font-medium text-foreground",
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/* ------------------------------- Doc primitives ---------------------------- */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-16 border-b pb-2 text-2xl font-semibold tracking-tight">
      <a href={"#" + id} className="hover:underline">
        {children}
      </a>
    </h2>
  );
}

function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-16 pt-2 text-lg font-semibold tracking-tight">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed">{children}</p>;
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border bg-card px-1 py-0.5 font-mono text-xs">{children}</code>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function Callout({
  variant = "note",
  children,
}: {
  variant?: "note" | "warning";
  children: React.ReactNode;
}) {
  const Icon = variant === "warning" ? TriangleAlertIcon : InfoIcon;
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-xl border p-4 text-sm leading-relaxed",
        variant === "warning" ? "border-destructive/40 bg-destructive/5" : "bg-muted/50",
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn("mt-0.5 size-4 shrink-0", variant === "warning" && "text-destructive")}
      />
      <div>{children}</div>
    </div>
  );
}

function CodeBlock({ file, children }: { file: string; children: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      toast.add({ type: "success", description: "Kode disalin." });
    } catch {
      toast.add({ type: "error", description: "Kode gagal disalin." });
    }
  };

  return (
    <figure className="overflow-hidden rounded-xl border bg-card">
      <figcaption className="flex items-center justify-between gap-2 border-b bg-muted px-3 py-1.5">
        <span className="truncate font-mono text-xs text-muted-foreground">{file}</span>
        <Button variant="ghost" size="icon-xs" onClick={copy} aria-label={"Salin " + file}>
          <CopyIcon aria-hidden="true" />
        </Button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
        <code>{children}</code>
      </pre>
    </figure>
  );
}

/* --------------------------------- Page data ------------------------------- */

const ROADMAP = [
  [
    "0",
    "Fondasi: bersihkan demo, role, requireRole, kebijakan akun, seed master",
    "RBAC server-side berfungsi",
  ],
  ["1", "App shell: sidebar/header per role, kerangka dashboard", "Navigasi per role"],
  [
    "2",
    "Akademik: tahun ajaran, mapel, kelas, enrollment, manajemen user",
    "Admin menyiapkan data dasar",
  ],
  ["3", "Course dan materi", "Guru membuat, siswa membaca"],
  ["4", "Proyek, enam tahap, progres", "Inti PjBL berjalan"],
  ["5", "Forum diskusi dan submission", "Interaksi dan pengumpulan"],
  ["6", "Rubrik, penilaian, umpan balik, refleksi, revisi", "Siklus lengkap"],
  ["7", "Laporan progres, polishing, E2E, header keamanan", "Siap dipakai"],
];

const TREE = `src/
├── routes/
│   ├── __root.tsx                    [ubah] metadata, lang="id"
│   ├── index.tsx                     [ubah] landing sederhana
│   ├── docs.tsx                      [baru] dokumentasi ini
│   ├── _guest/ login.tsx             [ubah] hapus demo & sosial
│   │         signup.tsx              [ubah/hapus] sesuai keputusan
│   ├── _auth/route.tsx               [ada]
│   └── _auth/app/
│       ├── route.tsx                 [ubah] shell: sidebar + header per role
│       ├── index.tsx                 [ubah] dashboard sesuai role
│       ├── _student/                 [baru] learn/, projects/$projectId/…
│       ├── teacher/                  [baru] classes, courses, projects, ...
│       ├── admin/                    [baru] users, classes, subjects, ...
│       └── profile.tsx, settings.tsx [baru]
├── features/                         [baru] schema, queries, functions,
│                                     *.server.ts, components per domain
├── components/
│   ├── ui/                           [ada] + sidebar, card, tabs, dll.
│   └── app-shell/, project/, stage/  [baru]
└── lib/
    ├── auth/ auth.ts                 [ubah] role, nonaktifkan signup publik
    │         middleware.ts           [ubah] tambah requireRole
    ├── db/schema/ types.ts           [baru]
    │              project.schema.ts  [baru] diekspor di index.ts
    │              relations.ts       [ubah]
    └── constants/pjbl-stages.ts      [baru]`;

const CODE = {
  types: `export const USER_ROLES = ["student", "teacher", "admin", "master"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export type ProjectStatus =
  | "draft"
  | "published"
  | "in_progress"
  | "submitted"
  | "under_review"
  | "revision_required"
  | "completed";

export type StageStatus = "not_started" | "in_progress" | "completed";

export function isUserRole(value: unknown): value is UserRole {
  return USER_ROLES.some((role) => role === value);
}
`,
  stages: `export const PJBL_STAGES = [
  { slug: "fundamental-question", order: 1, title: "Menentukan Pertanyaan Mendasar" },
  { slug: "project-planning", order: 2, title: "Mendesain Perencanaan Proyek" },
  { slug: "scheduling", order: 3, title: "Menyusun Jadwal" },
  { slug: "monitoring", order: 4, title: "Memonitor Kemajuan Proyek" },
  { slug: "testing", order: 5, title: "Menguji Hasil" },
  { slug: "evaluation", order: 6, title: "Mengevaluasi Pengalaman" },
] as const;

export type PjblStageSlug = (typeof PJBL_STAGES)[number]["slug"];
`,
  auth: `// Perubahan pada betterAuth({...}) yang sudah ada

  // Tambahkan: field role. input: false mencegah klien mengisinya sendiri.
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "student", input: false },
    },
  },

  // Ubah: tutup pendaftaran publik
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },

  // Hapus seluruh blok socialProviders (dan SocialSignInButtons di login/signup)
`,
  authCmd: `vpr auth:generate   # regenerasi auth.schema.ts (jangan edit manual)
vpr db generate
vpr db migrate`,
  middleware: `// Tambahkan di src/lib/auth/middleware.ts
import { isUserRole, type UserRole } from "#/lib/db/schema/types.ts";
import { useLogger } from "#/lib/logger.server.ts";

export const requireRole = (...roles: UserRole[]) =>
  createMiddleware()
    .middleware([authMiddleware])
    .server(async ({ next, context }) => {
      const role = context.user.role;

      if (!isUserRole(role) || !roles.includes(role)) {
        throw createError({
          message: "Forbidden",
          status: 403,
          why: "Role pengguna tidak memiliki akses ke operasi ini",
        });
      }

      useLogger().set({ user: { id: context.user.id, role } });
      return next();
    });
`,
  schema: `import { index, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

import type { PjblStageSlug } from "#/lib/constants/pjbl-stages.ts";

import { user } from "./auth.schema";
import type { ProjectStatus, StageStatus } from "./types";

export const project = pgTable(
  "project",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    status: text("status").$type<ProjectStatus>().notNull().default("draft"),
    teacherId: text("teacher_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    deadline: timestamp("deadline"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("project_teacher_idx").on(table.teacherId)],
);

// Status tahap dipisah dari status proyek (ProjectStatus).
export const projectStageProgress = pgTable(
  "project_stage_progress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    projectId: text("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    studentId: text("student_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    stage: text("stage").$type<PjblStageSlug>().notNull(),
    status: text("status").$type<StageStatus>().notNull().default("not_started"),
    completedAt: timestamp("completed_at"),
  },
  (table) => [unique("project_stage_progress_unique").on(table.projectId, table.studentId, table.stage)],
);
`,
  schemaIndex: `export * from "./auth.schema";
export * from "./project.schema";
`,
  guard: `import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authQueryOptions } from "#/lib/auth/queries.ts";
import { isUserRole } from "#/lib/db/schema/types.ts";

const ALLOWED = ["teacher", "admin", "master"];

export const Route = createFileRoute("/_auth/app/teacher")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.query({
      ...authQueryOptions(),
      staleTime: "static",
    });

    if (!user || !isUserRole(user.role) || !ALLOWED.includes(user.role)) {
      throw redirect({ to: "/app" });
    }
  },
  component: Outlet,
});
`,
  serverServer: `import "@tanstack/react-start/server-only";

import { db } from "#/lib/db/index.ts";

export function listTeacherProjects(teacherId: string) {
  return db.query.project.findMany({
    where: { teacherId },
    orderBy: { updatedAt: "desc" },
  });
}
`,
  serverFn: `import { createServerFn } from "@tanstack/react-start";

import { requireRole } from "#/lib/auth/middleware.ts";

import { listTeacherProjects } from "./projects.server.ts";

export const $getTeacherProjects = createServerFn({ method: "GET" })
  .middleware([requireRole("teacher", "admin", "master")])
  .handler(async ({ context }) => listTeacherProjects(context.user.id));
`,
  queries: `import { queryOptions } from "@tanstack/react-query";

import { $getTeacherProjects } from "./functions.ts";

export const teacherProjectsQueryOptions = () =>
  queryOptions({
    queryKey: ["teacher", "projects"],
    queryFn: ({ signal }) => $getTeacherProjects({ signal }),
  });
`,
  lifecycle: `import type { ProjectStatus } from "#/lib/db/schema/types.ts";

const TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  draft: ["published"],
  published: ["in_progress"],
  in_progress: ["submitted"],
  submitted: ["under_review"],
  under_review: ["completed", "revision_required"],
  revision_required: ["submitted"],
  completed: [],
};

export function canTransition(from: ProjectStatus, to: ProjectStatus) {
  return TRANSITIONS[from].includes(to);
}
`,
  lifecycleTest: `import { describe, expect, it } from "vite-plus/test";

import { canTransition } from "./lifecycle.ts";

describe("canTransition", () => {
  it.each([
    { from: "draft", to: "published", expected: true },
    { from: "under_review", to: "revision_required", expected: true },
    { from: "revision_required", to: "submitted", expected: true },
    { from: "draft", to: "completed", expected: false },
    { from: "completed", to: "draft", expected: false },
  ] as const)("$from → $to: $expected", ({ from, to, expected }) => {
    expect(canTransition(from, to)).toBe(expected);
  });
});
`,
  stepper: `import { CheckIcon } from "lucide-react";

import { PJBL_STAGES, type PjblStageSlug } from "#/lib/constants/pjbl-stages.ts";
import type { StageStatus } from "#/lib/db/schema/types.ts";
import { cn } from "#/lib/utils.ts";

const STATUS_LABEL: Record<StageStatus, string> = {
  not_started: "Belum tersedia",
  in_progress: "Sedang dikerjakan",
  completed: "Selesai",
};

export function StageStepper({
  statuses,
  activeStage,
}: {
  statuses: Record<PjblStageSlug, StageStatus>;
  activeStage: PjblStageSlug;
}) {
  const done = PJBL_STAGES.filter((s) => statuses[s.slug] === "completed").length;

  return (
    <nav aria-label="Tahapan pembelajaran">
      <p className="mb-3 text-sm text-muted-foreground">
        {done}/{PJBL_STAGES.length} tahap selesai
      </p>
      <ol className="flex flex-col gap-2">
        {PJBL_STAGES.map((stage) => {
          const status = statuses[stage.slug];
          return (
            <li
              key={stage.slug}
              aria-current={stage.slug === activeStage ? "step" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 text-sm",
                stage.slug === activeStage && "border-primary",
                status === "not_started" && "text-muted-foreground",
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs">
                {status === "completed" ? <CheckIcon className="size-3.5" aria-hidden="true" /> : stage.order}
              </span>
              <span className="flex-1">{stage.title}</span>
              <span className="text-xs text-muted-foreground">{STATUS_LABEL[status]}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
`,
};

/* ----------------------------------- Page ---------------------------------- */

function DocsPage() {
  const active = useActiveId(ALL_IDS);

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-20 flex h-12 items-center justify-between border-b bg-background/90 px-4 backdrop-blur">
        <span className="text-sm font-semibold">PjBL Interactive Media · Dokumentasi</span>
        <ThemeToggle />
      </header>

      <div className="mx-auto flex max-w-6xl">
        <aside className="sticky top-12 hidden h-[calc(100svh-3rem)] w-60 shrink-0 overflow-y-auto border-r py-6 pr-4 lg:block">
          <Toc active={active} />
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 lg:px-10">
          <details className="mb-8 rounded-xl border p-3 lg:hidden">
            <summary className="cursor-pointer text-sm font-medium">Daftar isi</summary>
            <div className="mt-3">
              <Toc active={active} />
            </div>
          </details>

          <article className="max-w-3xl space-y-14">
            {/* ---------------------------- Ringkasan ---------------------------- */}
            <section className="space-y-4">
              <h1
                id="ringkasan"
                className="scroll-mt-16 text-4xl font-bold tracking-tight text-balance"
              >
                Analisis dan Arsitektur
              </h1>
              <P>
                Project Based Learning Interactive Media untuk SMK Negeri 1 Patumbak, kelas XI PPLG,
                mata pelajaran Pemrograman Web, tahun ajaran 2026/2027. Dokumen ini merangkum
                analisis starter, arsitektur yang diusulkan, template kode untuk fase pertama, dan
                roadmap.
              </P>
              <Callout>
                Template kode di bawah belum dijalankan atau dilint terhadap repositori Anda. Anggap
                sebagai usulan yang perlu diverifikasi dengan <C>vpr lint</C>.
              </Callout>
            </section>

            {/* ----------------------------- Analisis ---------------------------- */}
            <section className="space-y-4">
              <H2 id="analisis">Arsitektur starter</H2>
              <P>
                Fondasi: Cove Stack, <strong>single repo</strong> (bukan monorepo). TanStack Start,
                Router, dan Query; Drizzle ORM v1 RC; Better Auth; Nitro v3 RC; Vite+; Tailwind v4;
                shadcn/ui dengan Base UI; evlog; varlock.
              </P>
              <H3>Pola yang sudah ditetapkan</H3>
              <Bullets
                items={[
                  "Import memakai alias #/ dengan ekstensi .ts/.tsx eksplisit.",
                  "Query adalah sumber kebenaran data server; komponen memakai useQuery/useSuspenseQuery.",
                  "Server function berawalan $ dan wajib memakai authMiddleware/freshAuthMiddleware.",
                  "Error memakai createError dari evlog; konteks domain lewat useLogger().set({...}).",
                  "Enum memakai text().$type<Union>() di src/lib/db/schema/types.ts (belum ada), bukan pgEnum.",
                  "auth.schema.ts di-generate (vpr auth:generate) dan tidak diedit manual.",
                  "Validasi dengan vpr lint; Vitest berdampingan dengan source; E2E dengan Playwright.",
                ]}
              />
              <H3>Route saat ini</H3>
              <CodeBlock file="route tree">{`/                  → IntroPage (demo, perlu diganti)
/_guest/login, /_guest/signup
/_auth/app/        → placeholder
/api/auth/$        → handler Better Auth`}</CodeBlock>
              <H3>Temuan penting</H3>
              <Bullets
                items={[
                  "Belum ada konsep role. Tabel user hanya punya field standar, jadi RBAC dibangun dari nol.",
                  "Signup publik terbuka, padahal akun siswa dan guru seharusnya dikelola. Login sosial juga kurang cocok untuk sekolah.",
                  "relations.ts kosong dan schema/index.ts hanya mengekspor auth. Setiap skema baru harus diekspor dari index.ts.",
                  "Komponen UI yang ada: button, input, label, dropdown-menu, toast. Sidebar, card, tabs, table, dialog perlu ditambah lewat vpr ui add.",
                  "Tidak ada library validasi input dan tidak ada penyimpanan file.",
                  "Sisa demo: _DELETE_ME_*, kredensial demo di login.tsx, pengecekan cove.mugnavo.com, branding Acme Inc., metadata __root.tsx, app/route.tsx placeholder.",
                  "cookieCache 5 menit: perubahan role baru berlaku ≤5 menit, kecuali operasi sensitif memakai freshAuthMiddleware.",
                ]}
              />
            </section>

            <section className="space-y-4">
              <H2 id="dipertahankan">Fungsionalitas yang dipertahankan</H2>
              <Bullets
                items={[
                  "Better Auth (email/password, session, cookie cache) dan guard route _auth / _guest",
                  "authMiddleware dan freshAuthMiddleware",
                  "Pola server function + Query + SSR",
                  "evlog dan start.ts (CSRF + error logging), varlock",
                  "Drizzle + Postgres + docker-compose",
                  "ThemeProvider / ThemeToggle dan komponen UI yang ada",
                  "Setup Vitest dan Playwright, DefaultCatchBoundary dan DefaultNotFound",
                ]}
              />
            </section>

            <section className="space-y-4">
              <H2 id="dibuat">Fungsionalitas yang perlu dibuat</H2>
              <Bullets
                items={[
                  "RBAC empat role dan manajemen pengguna oleh admin",
                  "Seluruh skema domain",
                  "App shell dan sidebar per role",
                  "Library validasi dan penyimpanan file",
                  "Modul LMS: course, materi, proyek, enam tahap, forum, submission, rubrik/penilaian, refleksi, laporan progres",
                  "Pengumuman, UI Bahasa Indonesia, komponen UI tambahan",
                ]}
              />
            </section>

            {/* ---------------------------- Arsitektur --------------------------- */}
            <section className="space-y-4">
              <H2 id="arsitektur">Arsitektur PjBL</H2>
              <H3>Otorisasi berlapis (server-enforced)</H3>
              <Bullets
                items={[
                  "Role disimpan di user.role (student | teacher | admin | master), bertipe union di types.ts.",
                  "requireRole(...roles) dibangun di atas authMiddleware dan dipakai di setiap server function.",
                  "Otorisasi resource (guru hanya course miliknya, siswa hanya proyek kelasnya) dilakukan di helper server yang juga mengisi konteks evlog.",
                  "beforeLoad per role hanya untuk UX, bukan jaminan keamanan.",
                ]}
              />
              <H3>Enam tahap sebagai konfigurasi kode + data progres</H3>
              <Bullets
                items={[
                  "Definisi tahap berupa konstanta PJBL_STAGES, karena enam tahap bersifat tetap.",
                  "Database menyimpan isi per tahap pada setiap proyek dan progres per siswa/kelompok per tahap.",
                  "Satu route dinamis stages/$stage melayani keenam tahap.",
                  "Status proyek dan status tahap disimpan di kolom terpisah.",
                ]}
              />
              <H3>Organisasi fitur</H3>
              <P>
                Penambahan <C>src/features/&lt;domain&gt;/</C> berisi schema validasi, queryOptions,
                server function, logika DB (<C>*.server.ts</C>), dan komponen. Route tetap tipis.
              </P>
              <H3>Entitas database (garis besar)</H3>
              <P>
                academic_year, subject, class, class_enrollment, course, material, project,
                project_stage_content, project_group + project_member (opsional), student_project,
                stage_progress, stage_activity/stage_submission, discussion_thread/discussion_post,
                submission, rubric + rubric_criterion, assessment + assessment_score, reflection,
                announcement.
              </P>
            </section>

            <section className="space-y-4">
              <H2 id="struktur">Struktur direktori</H2>
              <P>[ada] tidak diubah, [ubah] dimodifikasi, [baru] dibuat.</P>
              <CodeBlock file="src/">{TREE}</CodeBlock>
            </section>

            {/* ------------------------- Template kode -------------------------- */}
            <section className="space-y-5">
              <H2 id="template">Template kode: Fase 0</H2>
              <P>
                Template untuk tugas pertama (role + RBAC server-side) dan pondasi domain proyek.
                Semuanya mengikuti konvensi repo: alias <C>#/</C> dengan ekstensi, enum sebagai text
                bertipe union, server function dengan middleware, dan Query sebagai sumber data.
              </P>
              <Callout variant="warning">
                Template mengasumsikan <strong>field role kustom</strong> (opsi b) dan akun dibuat
                oleh admin. Keduanya masih keputusan terbuka. Jika memilih plugin admin Better Auth,
                bagian <C>auth.ts</C> dan <C>requireRole</C> akan berubah.
              </Callout>

              <H3 id="tpl-types">1. Tipe domain</H3>
              <CodeBlock file="src/lib/db/schema/types.ts [baru]">{CODE.types}</CodeBlock>

              <H3 id="tpl-stages">2. Konstanta enam tahap</H3>
              <CodeBlock file="src/lib/constants/pjbl-stages.ts [baru]">{CODE.stages}</CodeBlock>

              <H3 id="tpl-auth">3. Role di Better Auth</H3>
              <CodeBlock file="src/lib/auth/auth.ts [ubah]">{CODE.auth}</CodeBlock>
              <CodeBlock file="terminal">{CODE.authCmd}</CodeBlock>
              <Callout variant="warning">
                Verifikasi dua hal sebelum dipakai: (1) apakah <C>disableSignUp</C> juga menutup
                pembuatan akun dari sisi server di versi 1.7.26. Jika ya, admin membutuhkan jalur
                lain, misalnya plugin admin. (2) tipe <C>context.user.role</C> setelah schema
                di-generate. <C>isUserRole</C> sudah menangani nilai yang tidak terduga.
              </Callout>

              <H3 id="tpl-middleware">4. requireRole</H3>
              <CodeBlock file="src/lib/auth/middleware.ts [ubah]">{CODE.middleware}</CodeBlock>
              <P>
                Memakai <C>authMiddleware</C> (cache 5 menit). Untuk operasi destruktif seperti
                mengubah role pengguna, buat varian di atas <C>freshAuthMiddleware</C>.
              </P>

              <H3 id="tpl-schema">5. Skema proyek dan progres tahap</H3>
              <CodeBlock file="src/lib/db/schema/project.schema.ts [baru]">{CODE.schema}</CodeBlock>
              <CodeBlock file="src/lib/db/schema/index.ts [ubah]">{CODE.schemaIndex}</CodeBlock>
              <P>
                Impor dari constants memakai <C>import type</C> agar terhapus saat runtime dan aman
                dibaca drizzle-kit.
              </P>

              <H3 id="tpl-guard">6. Guard route per role</H3>
              <CodeBlock file="src/routes/_auth/app/teacher/route.tsx [baru]">
                {CODE.guard}
              </CodeBlock>
              <Callout>
                Guard ini hanya untuk pengalaman pengguna. Keamanan sebenarnya ada di
                <C> requireRole</C> pada setiap server function.
              </Callout>

              <H3 id="tpl-serverfn">7. Fitur: server function, logika DB, query</H3>
              <CodeBlock file="src/features/projects/projects.server.ts [baru]">
                {CODE.serverServer}
              </CodeBlock>
              <CodeBlock file="src/features/projects/functions.ts [baru]">
                {CODE.serverFn}
              </CodeBlock>
              <CodeBlock file="src/features/projects/queries.ts [baru]">{CODE.queries}</CodeBlock>
              <P>
                Komponen memakai <C>useQuery(teacherProjectsQueryOptions())</C> dengan UI untuk
                kondisi loading, error, dan kosong. Validasi input akan ditambahkan setelah library
                validasi disetujui.
              </P>

              <H3 id="tpl-lifecycle">8. Status proyek dan tesnya</H3>
              <CodeBlock file="src/features/projects/lifecycle.ts [baru]">
                {CODE.lifecycle}
              </CodeBlock>
              <CodeBlock file="src/features/projects/lifecycle.test.ts [baru]">
                {CODE.lifecycleTest}
              </CodeBlock>

              <H3 id="tpl-stepper">9. Komponen StageStepper</H3>
              <CodeBlock file="src/components/stage/stage-stepper.tsx [baru]">
                {CODE.stepper}
              </CodeBlock>
              <P>
                Komponen presentasional. Tautan ke <C>stages/$stage</C> ditambahkan setelah route
                proyek dibuat, agar tidak merusak type-check route yang belum ada.
              </P>
            </section>

            {/* ----------------------------- Perencanaan ------------------------- */}
            <section className="space-y-4">
              <H2 id="roadmap">Roadmap</H2>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-120 text-left text-sm">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Fase</th>
                      <th className="px-3 py-2 font-medium">Fokus</th>
                      <th className="px-3 py-2 font-medium">Hasil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROADMAP.map(([phase, focus, result]) => (
                      <tr key={phase} className="border-t align-top">
                        <td className="px-3 py-2 font-medium">{phase}</td>
                        <td className="px-3 py-2">{focus}</td>
                        <td className="px-3 py-2 text-muted-foreground">{result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>
                Setiap fase diakhiri dengan <C>vpr lint</C>, tes yang relevan, dan E2E untuk alur
                kritis.
              </P>
            </section>

            <section className="space-y-4">
              <H2 id="tugas-pertama">Tugas pertama</H2>
              <P>Fase 0: role dan RBAC server-side (±5 file).</P>
              <Steps
                items={[
                  "Tambah types.ts dan pjbl-stages.ts (template 1 dan 2).",
                  "Tambah field role di auth.ts, jalankan auth:generate, db generate, db migrate.",
                  "Tambah requireRole di middleware.ts.",
                  "Nonaktifkan signup publik dan login sosial, bersihkan sisa demo.",
                  "Seed akun master pertama.",
                ]}
              />
            </section>

            <section className="space-y-4">
              <H2 id="keputusan">Keputusan terbuka</H2>
              <Steps
                items={[
                  "Mekanisme role: (a) plugin admin Better Auth dengan access control kustom, atau (b) field role kustom + requireRole. Template di atas memakai (b).",
                  "Pembuatan akun: oleh admin (disarankan, mungkin impor CSV) atau pendaftaran mandiri?",
                  "Login sosial: dihapus?",
                  "Pengerjaan proyek: individu, kelompok, atau keduanya?",
                  "Penyimpanan file: URL/teks dulu, atau upload file sejak awal?",
                  "Library validasi: boleh menambah Zod atau Valibot?",
                  "Bahasa UI: Bahasa Indonesia penuh tanpa library i18n?",
                ]}
              />
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}
