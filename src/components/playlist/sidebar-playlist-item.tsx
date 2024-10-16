"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/config/routes";
import { PlaylistWithArtists } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import { Disc3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function SidebarPlaylistItem({
  playlist: { id, coverUrl, name, artists },
}: { playlist: PlaylistWithArtists }) {
  const pathname = usePathname();

  const isActive = (id: string) =>
    useMemo(() => pathname === `${ROUTES.playlist}/${id}`, [pathname]);

  return (
    <li>
      <Button
        key={id}
        asChild
        size="sidebar"
        variant={isActive(id) ? "default" : "ghost"}
        className="w-full justify-start font-normal"
      >
        <Link href={`${ROUTES.playlist}/${id}`}>
          <Avatar className="flex size-10 items-center justify-center space-y-0 rounded-md">
            <AvatarImage
              src={coverUrl!}
              alt={`${name} cover`}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md">
              <Disc3 className="size-7 text-foreground" />
            </AvatarFallback>
          </Avatar>

          <div className="ml-4 space-y-0.5">
            <p className="font-medium text-sm leading-none">{name}</p>
            <p
              className={cn(
                "text-sm group-active:text-black",
                isActive(id)
                  ? "text-primary-foreground/50"
                  : "text-muted-foreground",
              )}
            >
              {artists}
            </p>
          </div>
        </Link>
      </Button>
    </li>
  );
}
