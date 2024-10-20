"use client";

import EditableName from "@/components/playlist/editable-name";
import PlaylistCover from "@/components/playlist/playlist-cover";
import PlaylistNavigation from "@/components/playlist/playlist-navigation";
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
import { Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export default function PlaylistHero({
  playlist: { id, name, coverUrl, tracksCount, duration, artists },
}: { playlist: PlaylistWithTracks }) {
  const pathname = usePathname();

  const router = useRouter();

  const { deletePlaylist } = usePlaylist();

  const { openDialog } = useAlertDialog();

  const handleDeletePlaylist = async (id: string) => {
    deletePlaylist(id);

    if (pathname === `${ROUTES.playlist}/${id}`) {
      router.prefetch(ROUTES.root);
      router.push(ROUTES.root);
    }

    deletePlaylistAction(id);
    router.refresh();
  };

  return (
    <section className="flex flex-col gap-4 px-8 pt-4">
      <PlaylistNavigation playlistId={id} />
      <div className="flex items-start space-x-6">
        <PlaylistCover playlistId={id} coverUrl={coverUrl} />
        <div className="flex h-40 flex-col justify-end">
          <h6 className="mb-2 font-medium text-sm">Playlist</h6>
          <EditableName playlistId={id} initialName={name} />
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
              disabled={isProduction}
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
