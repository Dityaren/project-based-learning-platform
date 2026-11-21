import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ClipboardList, FolderKanban, ListChecks } from "lucide-react";

import Logo from "#/assets/logo";
import { ThemeToggle } from "#/components/theme-toggle.tsx";
import { Button } from "#/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card.tsx";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const container = "mx-auto w-full max-w-6xl px-4 md:px-6";

const features = [
  {
    icon: FolderKanban,
    title: "Project",
    description:
      "Kerjakan project nyata secara bertahap dan pantau perkembanganmu di setiap tahap.",
  },
  {
    icon: BookOpen,
    title: "Materi",
    description:
      "Akses materi pembelajaran yang terstruktur kapan saja, langsung dari satu tempat.",
  },
  {
    icon: ClipboardList,
    title: "Tugas",
    description:
      "Lihat tugas yang harus dikumpulkan dan tenggatnya, supaya tidak ada yang terlewat.",
  },
  {
    icon: ListChecks,
    title: "Quiz",
    description: "Uji pemahamanmu dengan quiz singkat dan lihat hasilnya secara langsung.",
  },
];

const steps = [
  {
    title: "Masuk ke akunmu",
    description: "Login dengan akun siswa untuk mulai belajar.",
  },
  {
    title: "Pelajari materi",
    description: "Pahami konsep dasar sebelum mengerjakan project.",
  },
  {
    title: "Kerjakan project",
    description: "Terapkan ilmu lewat project dan kumpulkan tugasmu.",
  },
  {
    title: "Uji dengan quiz",
    description: "Ukur pemahamanmu dan tingkatkan di tahap berikutnya.",
  },
];

function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className={`${container} flex h-14 items-center justify-between`}>
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button render={<Link to="/app" />} nativeButton={false} size="sm">
              Masuk
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/10 to-transparent"
          />
          <div
            className={`${container} flex flex-col items-center gap-6 py-20 text-center md:py-28`}
          >
            <span className="rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Project-Based Learning
            </span>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Belajar lebih bermakna lewat <span className="text-primary">project nyata</span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              ProjectLearn membantumu memahami materi, mengerjakan project, dan mengukur kemajuan
              belajar dalam satu platform yang sederhana.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button render={<Link to="/app" />} nativeButton={false} size="lg">
                Mulai belajar
                <ArrowRight />
              </Button>
              <Button render={<a href="#fitur" />} nativeButton={false} size="lg" variant="outline">
                Lihat fitur
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="fitur" className="scroll-mt-16 border-t bg-muted/30">
          <div className={`${container} py-16 md:py-20`}>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Semua yang kamu butuhkan untuk belajar
              </h2>
              <p className="mt-2 text-muted-foreground">
                Dirancang agar alur belajar terasa jelas dari awal sampai akhir.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="shadow-none">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t">
          <div className={`${container} py-16 md:py-20`}>
            <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight md:text-3xl">
              Bagaimana cara kerjanya?
            </h2>

            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t">
          <div className={`${container} py-16 md:py-20`}>
            <Card className="bg-secondary shadow-none ring-0">
              <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                <h2 className="text-2xl font-semibold tracking-tight">Semangat Belajar!</h2>
                <p className="max-w-md text-muted-foreground">
                  Masuk sekarang dan lanjutkan project belajarmu.
                </p>
                <Button render={<Link to="/app" />} nativeButton={false} size="lg">
                  Masuk ke dashboard
                  <ArrowRight />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div
          className={`${container} flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row`}
        >
          <p>© {new Date().getFullYear()} ProjectLearn. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>PjBL Media</span>
            {import.meta.env.DEV && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 font-medium text-amber-600 dark:text-amber-400">
                dev
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
