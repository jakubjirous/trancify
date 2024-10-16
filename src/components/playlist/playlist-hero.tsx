"use client";

import PlaylistNavigation from "@/components/playlist/playlist-navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ROUTES from "@/config/routes";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { usePlaylist } from "@/hooks/use-playlist";
import { deletePlaylistAction } from "@/lib/actions";
import { PlaylistWithTracks } from "@/lib/db/types";
import formatDuration from "@/utils/format-duration";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Disc3, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function PlaylistHero({
  playlist: { id, name, coverUrl, tracksCount, duration, artists },
}: { playlist: PlaylistWithTracks }) {
  const pathname = usePathname();

  const router = useRouter();

  const { deletePlaylist } = usePlaylist();

  const { openDialog } = useAlertDialog();

  async function handleDeletePlaylist(id: string) {
    deletePlaylist(id);

    if (pathname === `${ROUTES.playlist}/${id}`) {
      router.prefetch(ROUTES.dashboard);
      router.push(ROUTES.dashboard);
    }

    deletePlaylistAction(id);
    router.refresh();
  }

  return (
    <section className="flex flex-col gap-4 px-8 pt-4">
      <PlaylistNavigation playlistId={id} />
      <div className="flex items-start space-x-6">
        <Avatar className="h-40 w-40 rounded-md object-cover">
          <AvatarImage
            src={coverUrl!}
            alt="Playlist cover"
            className="object-cover"
          />
          <AvatarFallback className="rounded-md">
            <Disc3 className="h-28 w-28" />
          </AvatarFallback>
        </Avatar>
        <div className="flex h-40 flex-col justify-end">
          <h6 className="mb-2 font-medium text-sm">Playlist</h6>
          <h1 className="mb-4 font-bold text-5xl">{name}</h1>
          <p className="mb-1 text-muted-foreground text-sm">
            <span>{tracksCount} tracks</span>
            <span className="px-2">•</span>
            <span>{formatDuration(duration)}</span>
            {artists && (
              <>
                <span className="px-2">•</span>
                <span>{artists} and more</span>
              </>
            )}
          </p>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsHorizontalIcon className="size-4" />
              <span className="sr-only">Playlist options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem
              onClick={() =>
                openDialog({
                  title: "Delete from Your Library?",
                  description: (
                    <>
                      This will delete <strong>{name}</strong> playlist from
                      Your Library.
                    </>
                  ),
                  cancelLabel: "Cancel",
                  actionLabel: "Delete",
                  onAction: () => handleDeletePlaylist(id),
                })
              }
            >
              <Trash className="mr-2 size-3" />
              Delete Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
