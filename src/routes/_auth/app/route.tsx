import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "#/components/app-sidebar";
import { SignOutButton } from "#/components/sign-out-button.tsx";
import { ThemeToggle } from "#/components/theme-toggle.tsx";
import { Button } from "#/components/ui/button.tsx";
import { SidebarProvider } from "#/components/ui/sidebar";
import { SidebarInset } from "#/components/ui/sidebar";

import { navData } from "./-nav-data";

export const Route = createFileRoute("/_auth/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar items={navData} />

      <SidebarInset className="min-h-svh">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
