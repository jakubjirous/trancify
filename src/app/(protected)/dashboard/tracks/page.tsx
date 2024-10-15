import Title from "@/components/title";
import TableWithTracks from "@/components/tracks/table-with-tracks";
import { getAllTracks } from "@/lib/db/queries";
import React from "react";

export default async function TracksPage() {
  const tracks = await getAllTracks();

  return (
    <section className="grid h-full grid-rows-[auto,minmax(0,1fr)]">
      <Title title="Your tracks" />

      <TableWithTracks
        tracks={tracks}
        // headerStyles="bg-background" // TODO: fix (Jakub Jirous 2024-10-15 14:44:24)
      />
    </section>
  );
}
