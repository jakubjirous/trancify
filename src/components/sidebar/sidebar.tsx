"use client";

import KeyboardShortcuts from "@/components/keyboard-shortcuts";
import SidebarPlaylists from "@/components/playlist/sidebar-playlists";
import Search from "@/components/sidebar/search";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import ROUTES from "@/config/routes";
import { cn } from "@/utils/cn";
import { House, ListMusic, Music2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes, ReactNode } from "react";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden h-[calc(100dvh-8rem)] w-full grid-rows-[minmax(0,1fr),4rem] border-r border-r-muted md:grid",
        className,
      )}
    >
      <div className="pt-4">
        <div className="px-3 py-4">
          <h1 className="mb-2 px-4 font-semibold text-xl tracking-tight">
            Trancify
          </h1>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === `${ROUTES.root}` ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={ROUTES.root}>
                <House className="mr-2 size-4" />
                Home
                <Kbd>^1</Kbd>
              </Link>
            </Button>
            <Search />
          </div>
        </div>
        <div className="px-3 py-4">
          <h2 className="mb-2 px-4 font-semibold text-lg tracking-tight">
            Your Library
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === `${ROUTES.tracks}` ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={ROUTES.tracks}>
                <Music2 className="mr-2 size-4" />
                Tracks
                <Kbd>^3</Kbd>
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === `${ROUTES.playlists}` ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={ROUTES.playlists}>
                <ListMusic className="mr-2 size-4" />
                Playlists
                <Kbd>^4</Kbd>
              </Link>
            </Button>
          </div>
        </div>
        <SidebarPlaylists />
      </div>
      <div className="flex flex-row items-center gap-3 px-7 pb-4">
        <ThemeSwitcher />
        <KeyboardShortcuts />
      </div>
    </aside>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className={cn("absolute right-1.5 flex items-center justify-center")}>
      <span
        className={cn(
          "rounded-sm border px-2 py-1 font-mono text-inherit text-xs tracking-widest",
        )}
      >
        {children}
      </span>
    </kbd>
  );
}
