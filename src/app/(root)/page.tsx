import PlaylistCards from "@/components/playlist/playlist-cards";
import Title from "@/components/title";
import TableWithTracks from "@/components/tracks/table-with-tracks";
import { getAllTracks } from "@/lib/db/queries";
import React from "react";

export default async function Page() {
  const tracks = await getAllTracks(5);

  return (
    <div className="grid h-full grid-rows-[16rem,minmax(0,1fr)] gap-y-8">
      <section>
        <Title title="Made for you" />
        <PlaylistCards limit={2} onIndex />
      </section>
      <section className="border-t border-t-foreground/10">
        <TableWithTracks tracks={tracks} />
      </section>
    </div>
  );
}
