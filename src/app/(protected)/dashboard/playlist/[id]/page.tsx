import PlaylistNavigation from "@/components/playlist/playlist-navigation";
import TableWithTracks from "@/components/tracks/table-with-tracks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ROUTES from "@/config/routes";
import { getPlaylistWithTracks } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import { Disc3 } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

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
    <div className="relative grid h-full grid-rows-[16rem,minmax(0,1fr)] gap-y-4 bg-gradient-to-b from-transparent to-50% to-background">
      <div
        className="-z-10 absolute inset-0 animate-scale-image bg-center bg-cover opacity-30"
        style={{ backgroundImage: `url(${playlist.coverUrl})` }}
      />
      <section className="px-8 pt-4">
        <PlaylistNavigation playlistId={id} />
        <div className="flex items-start space-x-6">
          <Avatar className="h-40 w-40 rounded-md object-cover">
            <AvatarImage
              src={playlist.coverUrl}
              alt="Playlist cover"
              className="object-cover"
            />
            <AvatarFallback className="rounded-md">
              <Disc3 className="h-28 w-28" />
            </AvatarFallback>
          </Avatar>
          <div className="flex h-40 flex-col justify-end">
            <h6 className="mb-2 font-medium text-sm">Playlist</h6>
            <h1 className="mb-4 font-bold text-5xl">{playlist.name}</h1>
            <p className="mb-1 text-muted-foreground text-sm">
              {playlist.artists} and more
            </p>
          </div>
        </div>
      </section>
      <section>
        <TableWithTracks
          tracks={playlist.tracks}
          // headerStyles="backdrop-blur-xl" // TODO: fix this (Jakub Jirous 2024-10-14 11:02:30)
        />
      </section>
    </div>
  );
}
