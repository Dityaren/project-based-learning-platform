import {
  BookOpenText,
  BriefcaseBusiness,
  ClipboardCheck,
  FolderKanban,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";

import type { NavItem } from "#/components/nav-main";

export const navData: NavItem[] = [
  { title: "Beranda", icon: LayoutDashboard, href: "/app", exact: true },

  { label: "Belajar", isSection: true },
  { title: "Project", icon: FolderKanban, href: "/app/project" },
  { title: "Tugas", icon: ClipboardCheck, href: "/app/tugas" },
  { title: "Materi", icon: BookOpenText, href: "/app/materi" },

  { label: "Kolaborasi", isSection: true },
  { title: "Tim", icon: UsersRound, href: "/app/tim" },
  { title: "Portofolio", icon: BriefcaseBusiness, href: "/app/portofolio" },
];
