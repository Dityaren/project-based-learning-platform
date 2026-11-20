import { createFileRoute } from "@tanstack/react-router";

// Place at: src/routes/docs.tsx  → /docs (public, outside the _auth layout)
export const Route = createFileRoute("/docs")({
  component: ArchitectureDoc,
});

const retained = [
  "Better Auth (email/password, session, cookie cache)",
  "Guard route _auth / _guest",
  "authMiddleware dan freshAuthMiddleware",
  "Pola server function + Query + SSR",
  "evlog dan start.ts (CSRF + error logging)",
  "varlock, Drizzle + Postgres, docker-compose",
  "ThemeProvider / ThemeToggle",
  "Komponen UI yang ada, setup Vitest dan Playwright",
  "DefaultCatchBoundary dan DefaultNotFound",
];

const missing = [
  "RBAC empat role",
  "Manajemen pengguna oleh admin",
  "Seluruh skema domain",
  "App shell dan sidebar per role",
  "Library validasi",
  "Penyimpanan file",
  "Modul LMS: course, materi, proyek, enam tahap, forum, submission, rubrik/penilaian, refleksi, laporan progres",
  "Pengumuman",
  "UI Bahasa Indonesia",
  "Komponen UI tambahan",
];

const findings = [
  "Belum ada konsep role. Tabel user hanya punya field standar, jadi RBAC dibangun dari nol.",
  "Signup publik terbuka, padahal akun siswa dan guru seharusnya dikelola. Login sosial juga kurang cocok untuk konteks sekolah.",
  "relations.ts kosong dan schema/index.ts hanya mengekspor auth. Setiap skema baru harus diekspor dari index.ts.",
  "Komponen UI yang ada: button, input, label, dropdown-menu, toast. Sidebar, card, tabs, table, dialog, dll. perlu ditambah lewat vpr ui add.",
  "Tidak ada library validasi input untuk server function dan form.",
  "Tidak ada penyimpanan file, padahal ada pengumpulan proyek.",
  "Sisa demo yang perlu dibersihkan: _DELETE_ME_*, kredensial demo di login.tsx, pengecekan cove.mugnavo.com, branding Acme Inc., metadata __root.tsx, dan app/route.tsx placeholder.",
  "cookieCache 5 menit: perubahan role baru berlaku ≤5 menit, kecuali operasi sensitif memakai freshAuthMiddleware.",
];

const roadmap = [
  [
    "0",
    "Fondasi: bersihkan demo, role, requireRole, kebijakan akun, seed master",
    "RBAC server-side berfungsi",
  ],
  ["1", "App shell: sidebar/header per role, kerangka dashboard", "Navigasi per role"],
  [
    "2",
    "Akademik: tahun ajaran, mapel, kelas, enrollment, manajemen user",
    "Admin dapat menyiapkan data dasar",
  ],
  ["3", "Course dan materi", "Guru membuat course/materi, siswa membaca"],
  ["4", "Proyek, enam tahap, progres", "Inti PjBL berjalan"],
  ["5", "Forum diskusi dan submission", "Interaksi dan pengumpulan"],
  ["6", "Rubrik, penilaian, umpan balik, refleksi, status revisi", "Siklus lengkap"],
  ["7", "Laporan progres, polishing, E2E, hardening header keamanan", "Siap dipakai"],
];

const decisions = [
  "Mekanisme role: (a) plugin admin Better Auth dengan access control kustom, atau (b) field role kustom + helper requireRole. Condong ke (a) bila v1.7.26 mendukung empat role kustom; akan diverifikasi sebelum kode dibuat.",
  "Pembuatan akun: dibuat admin (disarankan, mungkin impor CSV nanti) atau siswa mendaftar sendiri?",
  "Login sosial: dihapus saja?",
  "Pengerjaan proyek: individu, kelompok, atau keduanya?",
  "Penyimpanan file: tahap awal cukup URL/tautan dan teks, atau perlu upload file sejak awal?",
  "Library validasi: boleh menambah Zod atau Valibot?",
  "Bahasa UI: Bahasa Indonesia penuh tanpa library i18n?",
];

const tree = `src/
├── routes/
│   ├── __root.tsx                    [ubah] metadata, lang="id"
│   ├── index.tsx                     [ubah] landing sederhana
│   ├── _guest/ login.tsx             [ubah] hapus demo & sosial
│   │         signup.tsx              [ubah/hapus] sesuai keputusan
│   ├── _auth/route.tsx               [ada]
│   └── _auth/app/
│       ├── route.tsx                 [ubah] shell: sidebar + header per role
│       ├── index.tsx                 [ubah] dashboard sesuai role
│       ├── _student/                 [baru] guard role siswa
│       │   ├── learn/…               courses, materials
│       │   └── projects/$projectId/… overview, stages/$stage, discussion,
│       │                             submissions, assessment
│       ├── teacher/                  [baru] classes, courses, projects,
│       │                             submissions, assessments
│       ├── admin/                    [baru] users, classes, subjects,
│       │                             academic-years, announcements, settings
│       └── profile.tsx, settings.tsx [baru] bersama
├── features/                         [baru] schema, queries, functions,
│                                     *.server.ts, components per domain
├── components/
│   ├── ui/                           [ada] + sidebar, card, tabs, dll.
│   └── app-shell/, project/, stage/  [baru]
└── lib/
    ├── auth/ auth.ts                 [ubah] role, nonaktifkan signup publik
    │         middleware.ts           [ubah] tambah requireRole
    ├── db/schema/ types.ts           [baru]
    │              *.schema.ts        [baru] diekspor di index.ts
    │              relations.ts       [ubah]
    └── constants/pjbl-stages.ts      [baru]`;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 space-y-3">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
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

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="pt-2 text-sm font-semibold">{children}</h3>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border bg-card px-1 py-0.5 font-mono text-xs">{children}</code>
  );
}

function ArchitectureDoc() {
  return (
    <article className="mx-auto max-w-prose space-y-10 px-4 py-10 text-foreground sm:px-6 md:py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">
          Analisis dan Rencana Arsitektur
        </h1>
        <p className="text-muted-foreground">
          Project Based Learning Interactive Media, SMK Negeri 1 Patumbak, kelas XI PPLG. Analisis
          berdasarkan file repositori starter. Belum ada kode yang dibuat.
        </p>
      </header>

      <Section id="analisis" title="1. Analisis arsitektur starter">
        <p className="text-sm leading-relaxed">
          Fondasi: Cove Stack, <strong>single repo</strong> (bukan monorepo). TanStack Start,
          Router, dan Query; Drizzle ORM v1 RC; Better Auth; Nitro v3 RC; Vite+; Tailwind v4;
          shadcn/ui dengan Base UI; evlog; varlock.
        </p>
        <Sub>Pola yang sudah ditetapkan</Sub>
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
        <Sub>Route saat ini</Sub>
        <pre className="overflow-x-auto rounded-md border bg-card p-3 font-mono text-xs">
          {`/                  → IntroPage (demo, perlu diganti)
/_guest/login, /_guest/signup
/_auth/app/        → placeholder
/api/auth/$        → handler Better Auth`}
        </pre>
        <Sub>Temuan penting</Sub>
        <Bullets items={findings} />
      </Section>

      <Section id="arsitektur" title="2. Arsitektur PjBL yang direkomendasikan">
        <Sub>a. Otorisasi berlapis (server-enforced)</Sub>
        <Bullets
          items={[
            "Role disimpan di user.role (student | teacher | admin | master), bertipe union di types.ts.",
            "requireRole(...roles) dibangun di atas authMiddleware dan dipakai di setiap server function.",
            "Otorisasi resource (guru hanya course miliknya, siswa hanya proyek kelasnya) dilakukan di helper server yang juga mengisi konteks evlog.",
            "beforeLoad per role hanya untuk UX, bukan jaminan keamanan.",
          ]}
        />
        <Sub>b. Enam tahap sebagai konfigurasi kode + data progres</Sub>
        <Bullets
          items={[
            "Definisi tahap (slug, urutan, judul) berupa konstanta PJBL_STAGES, karena enam tahap bersifat tetap.",
            "Database menyimpan isi per tahap pada setiap proyek dan progres per siswa/kelompok per tahap.",
            "Satu route dinamis stages/$stage melayani keenam tahap, lebih ringkas daripada enam route terpisah.",
            "Status proyek (Draft → … → Completed) dan status tahap (not_started / in_progress / completed) disimpan di kolom terpisah.",
          ]}
        />
        <Sub>c. Organisasi fitur</Sub>
        <p className="text-sm leading-relaxed">
          Penambahan struktur <Tag>src/features/&lt;domain&gt;/</Tag> berisi schema validasi,
          queryOptions, server function, logika DB (<Tag>*.server.ts</Tag>), dan komponen. Route
          tetap tipis.
        </p>
        <Sub>d. Entitas database (garis besar)</Sub>
        <p className="text-sm leading-relaxed text-muted-foreground">
          academic_year, subject, class, class_enrollment, course, material, project,
          project_stage_content, project_group + project_member (opsional), student_project,
          stage_progress, stage_activity/stage_submission, discussion_thread/discussion_post,
          submission, rubric + rubric_criterion, assessment + assessment_score, reflection,
          announcement.
        </p>
      </Section>

      <Section id="struktur" title="3. Struktur direktori yang diusulkan">
        <p className="text-sm text-muted-foreground">
          [ada] tidak diubah, [ubah] dimodifikasi, [baru] dibuat.
        </p>
        <pre className="overflow-x-auto rounded-md border bg-card p-3 font-mono text-xs leading-relaxed">
          {tree}
        </pre>
      </Section>

      <Section id="dipertahankan" title="4. Fungsionalitas yang dipertahankan">
        <Bullets items={retained} />
      </Section>

      <Section id="dibuat" title="5. Fungsionalitas yang perlu dibuat">
        <Bullets items={missing} />
      </Section>

      <Section id="roadmap" title="6. Roadmap bertahap">
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full min-w-120 text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Fase</th>
                <th className="px-3 py-2 font-medium">Fokus</th>
                <th className="px-3 py-2 font-medium">Hasil</th>
              </tr>
            </thead>
            <tbody>
              {roadmap.map(([phase, focus, result]) => (
                <tr key={phase} className="border-t align-top">
                  <td className="px-3 py-2 font-medium">{phase}</td>
                  <td className="px-3 py-2">{focus}</td>
                  <td className="px-3 py-2 text-muted-foreground">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Setiap fase diakhiri dengan <Tag>vpr lint</Tag>, tes yang relevan, dan E2E untuk alur
          kritis.
        </p>
      </Section>

      <Section id="tugas-pertama" title="7. Tugas pertama yang direkomendasikan">
        <p className="text-sm leading-relaxed">
          Fase 0, langkah awal: role dan RBAC server-side (±5 file).
        </p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
          <li>Tambah types.ts (UserRole).</li>
          <li>Tambah field role di config Better Auth, lalu vpr auth:generate dan migrasi.</li>
          <li>Tambah requireRole di middleware.ts.</li>
          <li>Nonaktifkan signup publik dan login sosial, bersihkan sisa demo.</li>
          <li>Seed akun master pertama.</li>
        </ol>
      </Section>

      <Section id="keputusan" title="Keputusan yang dibutuhkan">
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
          {decisions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ol>
      </Section>
    </article>
  );
}
