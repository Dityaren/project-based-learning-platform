"use client";

import { Link } from "@tanstack/react-router";
import { ArrowRight, Rocket } from "lucide-react";

import { CatBoxProject } from "#/assets/CatBoxProject";
import Logo from "#/assets/logo";
import { Card, CardContent } from "#/components/ui/card.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "#/components/ui/sidebar.tsx";

import { NavItem, NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

type ActiveProject = {
  title: string;
  progress: number;
  href: string;
};

export function AppSidebar({
  items,
  activeProject,
}: {
  items: NavItem[];
  activeProject?: ActiveProject | null;
}) {
  return (
    <Sidebar collapsible="icon">
      {}
      <SidebarHeader className="px-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/app" aria-label="BelajarProject" className="block w-full">
              <Logo />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {}
      <SidebarContent className="px-4 pb-4">
        <NavMain items={items} />

        {}
        <div className="mt-auto group-data-[collapsible=icon]:hidden">
          {activeProject ? <ContinueCard project={activeProject} /> : <EmptyCard />}
        </div>
      </SidebarContent>

      {}
      <SidebarFooter className="border-t px-4 py-3">
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

function ContinueCard({ project }: { project: ActiveProject }) {
  const progress = Math.min(100, Math.max(0, project.progress));

  return (
    <Link to={project.href} className="group block">
      <Card className="bg-secondary shadow-none ring-0 transition-colors group-hover:bg-secondary/70">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Lanjutkan
            </span>
            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </div>

          <p className="line-clamp-2 text-sm leading-snug font-semibold text-card-foreground">
            {project.title}
          </p>

          <div className="space-y-1.5">
            <div
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10"
            >
              <div
                className="h-full rounded-full bg-foreground transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{progress}% selesai</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EmptyCard() {
  return (
    <Link to="/app/project" className="group block">
      <Card className="bg-secondary shadow-none ring-0 transition-colors group-hover:bg-secondary/70">
        <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
          <CatBoxProject />
          <p className="text-sm font-semibold text-card-foreground">Mulai project pertamamu</p>
          <p className="text-xs text-muted-foreground">Pilih project dan mulai berkarya.</p>
        </CardContent>
      </Card>
    </Link>
  );
}
