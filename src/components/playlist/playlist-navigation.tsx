"use client";

import { Button } from "@/components/ui/button";
import ROUTES from "@/config/routes";
import { usePlaylist } from "@/hooks/use-playlist";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PlaylistNavigation({
  playlistId,
}: { playlistId: string }) {
  const { playlists } = usePlaylist();

  const currentIndex = playlists.findIndex(
    (playlist) => playlist.id === playlistId,
  );

  const prevPlaylistId =
    currentIndex > 0
      ? playlists[currentIndex - 1].id
      : playlists[playlists.length - 1].id;

  const nextPlaylistId =
    currentIndex < playlists.length - 1
      ? playlists[currentIndex + 1].id
      : playlists[0].id;

  return (
    <div className="flex gap-1">
      {prevPlaylistId && (
        <Link href={`${ROUTES.playlist}/${prevPlaylistId}`}>
          <Button variant="ghost" size="icon" className="rounded-md">
            <ChevronLeft className="size-6" />
          </Button>
        </Link>
      )}

      {nextPlaylistId && (
        <Link href={`${ROUTES.playlist}/${nextPlaylistId}`}>
          <Button variant="ghost" size="icon" className="rounded-md">
            <ChevronRight className="size-6" />
          </Button>
        </Link>
      )}
    </div>
  );
}
