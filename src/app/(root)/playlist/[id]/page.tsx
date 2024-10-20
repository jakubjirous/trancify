import PlaylistHero from "@/components/playlist/playlist-hero";
import TableWithTracks from "@/components/tracks/table-with-tracks";
import { getPlaylistWithTracks } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import React from "react";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const playlist = await getPlaylistWithTracks(id);

  if (!playlist) {
    notFound();
  }

  return (
    <div className="relative grid h-full grid-rows-[18rem,minmax(0,1fr)] gap-y-4 bg-gradient-to-b from-transparent to-40% to-background">
      <div
        className="-z-10 absolute inset-0 animate-scale-image bg-center bg-cover opacity-15"
        style={{ backgroundImage: `url(${playlist.coverUrl})` }}
      />
      <PlaylistHero playlist={playlist} />
      <section>
        <TableWithTracks tracks={playlist.tracks} playlist={playlist} />
      </section>
    </div>
  );
}
