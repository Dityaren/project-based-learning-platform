"use client";

import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#/components/ui/collapsible.tsx";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "#/components/ui/sidebar.tsx";
import { cn } from "#/lib/utils.ts";

export type NavItem = {
  label?: string;
  isSection?: boolean;
  title?: string;
  icon?: LucideIcon;
  href?: LinkProps["to"];
  exact?: boolean;
  children?: NavItem[];
};

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function isSelfActive(item: NavItem, pathname: string) {
  if (!item.href) return false;
  const href = item.href as string;
  return item.exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
}

function isTreeActive(item: NavItem, pathname: string): boolean {
  return isSelfActive(item, pathname) || !!item.children?.some((c) => isTreeActive(c, pathname));
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {items.map((item, index) => (
        <NavMainItem key={item.title || item.label || index} item={item} pathname={pathname} />
      ))}
    </>
  );
}

function NavMainItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasChildren = !!item.children?.length;
  const isActive = isTreeActive(item, pathname);
  const [isOpen, setIsOpen] = React.useState(isActive);

  React.useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  if (item.isSection && item.label) {
    return (
      <SidebarGroup className="p-0 pt-5 first:pt-0">
        <SidebarGroupLabel className="p-0 text-xs font-medium text-sidebar-foreground uppercase">
          {item.label}
        </SidebarGroupLabel>
      </SidebarGroup>
    );
  }

  if (hasChildren && item.title) {
    return (
      <SidebarGroup className="p-0">
        <SidebarMenu>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <SidebarMenuItem>
              <CollapsibleTrigger
                className="w-full"
                render={
                  <SidebarMenuButton
                    id={`nav-main-trigger-${slug(item.title)}`}
                    tooltip={item.title}
                    isActive={isActive}
                    className={cn(
                      "h-9 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive && "bg-primary! text-primary-foreground!",
                    )}
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "ml-auto transition-transform duration-200",
                        isOpen && "rotate-90",
                      )}
                    />
                  </SidebarMenuButton>
                }
              />
              <CollapsibleContent>
                <SidebarMenuSub className="me-0 pe-0">
                  {item.children!.map((child, index) => (
                    <NavMainSubItem key={child.title || index} item={child} pathname={pathname} />
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (item.title && item.href) {
    return (
      <SidebarGroup className="p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              id={`nav-main-button-${slug(item.title)}`}
              tooltip={item.title}
              isActive={isActive}
              className={cn(
                "h-9 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive && "bg-primary! text-primary-foreground!",
              )}
              render={<Link to={item.href} />}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return null;
}

function NavMainSubItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasChildren = !!item.children?.length;
  const isActive = isTreeActive(item, pathname);
  const [isOpen, setIsOpen] = React.useState(isActive);

  React.useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  if (hasChildren && item.title) {
    return (
      <SidebarMenuSubItem>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger
            className="w-full"
            render={
              <SidebarMenuSubButton
                id={`nav-sub-trigger-${slug(item.title)}`}
                className="h-9 rounded-md px-3 py-2 text-sm font-medium"
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight
                  className={cn("ml-auto transition-transform duration-200", isOpen && "rotate-90")}
                />
              </SidebarMenuSubButton>
            }
          />
          <CollapsibleContent>
            <SidebarMenuSub className="me-0 pe-0">
              {item.children!.map((child, index) => (
                <NavMainSubItem key={child.title || index} item={child} pathname={pathname} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuSubItem>
    );
  }

  if (item.title && item.href) {
    const active = isSelfActive(item, pathname);
    return (
      <SidebarMenuSubItem className="w-full">
        <SidebarMenuSubButton
          id={`nav-sub-button-${slug(item.title)}`}
          isActive={active}
          className={cn(
            "w-full rounded-md transition-colors",
            active && "bg-muted! text-foreground!",
          )}
          render={<Link to={item.href}>{item.title}</Link>}
        />
      </SidebarMenuSubItem>
    );
  }

  return null;
}
