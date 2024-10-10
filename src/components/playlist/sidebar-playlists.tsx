"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ROUTES from "@/config/routes";
import { usePlaylist } from "@/hooks/use-playlist";
import { Disc3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarPlaylists() {
  const { playlists, updatePlaylist } = usePlaylist();

  const pathname = usePathname();

  return (
    <div className="py-2">
      <h2 className="relative px-7 font-semibold text-lg tracking-tight">
        Playlists
      </h2>
      <ScrollArea className="h-[20rem] px-1">
        <ul className="space-y-1 p-2">
          {playlists?.map(({ id, name }, i) => (
            <Button
              key={id}
              asChild
              variant={
                pathname === `${ROUTES.playlist}/${id}` ? "default" : "ghost"
              }
              className="w-full justify-start font-normal"
            >
              <Link href={`${ROUTES.playlist}/${id}`}>
                <Disc3 className="mr-2 h-4 w-4" />
                {name}
              </Link>
            </Button>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
