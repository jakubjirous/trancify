"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ROUTES from "@/config/routes";
import { usePlaylist } from "@/hooks/use-playlist";
import { Disc3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function SidebarPlaylists() {
  const { playlistsWithArtists, updatePlaylist } = usePlaylist();

  const pathname = usePathname();

  const isActive = (id: string) =>
    useMemo(() => pathname === `${ROUTES.playlist}/${id}`, [pathname]);

  return (
    <div className="py-2">
      <h2 className="relative px-7 font-semibold text-lg tracking-tight">
        Playlists
      </h2>
      <ScrollArea className="h-[22rem] px-1">
        <ul className="space-y-1 p-2">
          {playlistsWithArtists?.map(({ id, name, coverUrl, tracks }, i) => (
            <li>
              <Button
                key={id}
                asChild
                size="sidebar"
                variant={isActive(id) ? "default" : "ghost"}
                className="w-full justify-start font-normal"
              >
                <Link href={`${ROUTES.playlist}/${id}`}>
                  <Avatar className="flex h-10 w-10 items-center justify-center space-y-0 rounded-md">
                    <AvatarImage src={coverUrl} alt="Avatar" />
                    <AvatarFallback>
                      <Disc3
                        className={`h-10 w-10 ${isActive(id) ? "fill-white" : ""}`}
                      />
                    </AvatarFallback>
                  </Avatar>

                  <div className="ml-4 space-y-0.5">
                    <p className="font-medium text-sm leading-none">{name}</p>
                    <p
                      className={`text-ellipsis text-sm group-active:text-black ${isActive(id) ? "text-primary-foreground/50" : "text-muted-foreground"}`}
                    >
                      {tracks.map(({ artist }) => artist).join(", ")}
                    </p>
                  </div>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
