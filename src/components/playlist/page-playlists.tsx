"use client";

import { usePlaylist } from "@/hooks/use-playlist";

export default function PagePlaylists() {
  const { playlists, playlistsWithArtists, updatePlaylist } = usePlaylist();

  return (
    <div className="py-2">
      <pre>{JSON.stringify(playlistsWithArtists, null, 2)}</pre>
      <pre>{JSON.stringify(playlists, null, 2)}</pre>
    </div>
  );
}
