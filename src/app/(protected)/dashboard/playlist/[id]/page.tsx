import PlaylistHero from "@/components/playlist/playlist-hero";
import TableWithTracks from "@/components/tracks/table-with-tracks";
import ROUTES from "@/config/routes";
import { getPlaylistWithTracks } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: remove and use useUser hook instead (Jakub Jirous 2024-10-11 08:36:45)
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(ROUTES.signIn);
  }

  const playlist = await getPlaylistWithTracks(user, id);

  if (!playlist) {
    notFound();
  }

  return (
    <div className="relative grid h-full grid-rows-[18rem,minmax(0,1fr)] gap-y-4 bg-gradient-to-b from-transparent to-40% to-background">
      <div
        className="-z-10 absolute inset-0 animate-scale-image bg-center bg-cover opacity-30"
        style={{ backgroundImage: `url(${playlist.coverUrl})` }}
      />
      <PlaylistHero playlist={playlist} />
      <section>
        <TableWithTracks tracks={playlist.tracks} playlist={playlist} />
      </section>
    </div>
  );
}
