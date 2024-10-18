"use client";

import KeyboardShortcuts from "@/components/keyboard-shortcuts";
import SidebarPlaylists from "@/components/playlist/sidebar-playlists";
import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import UserNav from "@/components/user-nav";
import ROUTES from "@/config/routes";
import { cn } from "@/utils/cn";
import { House, ListMusic, Music2, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col justify-between border-r border-r-muted",
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
              variant={pathname === `${ROUTES.dashboard}` ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={ROUTES.dashboard}>
                <House className="mr-2 size-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 size-4" />
              Search
            </Button>
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
              </Link>
            </Button>
          </div>
        </div>
        <SidebarPlaylists />
      </div>
      <div className="flex flex-row items-start gap-3 px-7 pb-8">
        <UserNav />
        <ThemeSwitcher />
        <KeyboardShortcuts />
      </div>
    </aside>
  );
}
