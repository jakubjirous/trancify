"use client";

import AddPlaylist from "@/components/playlist/add-playlist";
import TableWithPlaylists from "@/components/playlist/table-with-playlists";
import { usePlaylist } from "@/hooks/use-playlist";

export default function SidebarPlaylists() {
  const { playlistsWithArtists, updatePlaylist } = usePlaylist();

  return (
    <section className="py-2">
      <div className="flex w-full items-center justify-between pr-4">
        <h2 className="relative px-7 font-semibold text-lg tracking-tight">
          Playlists
        </h2>
        <AddPlaylist size="icon" />
      </div>

      <TableWithPlaylists playlists={playlistsWithArtists} />
    </section>
  );
}
