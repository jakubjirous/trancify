import Title from "@/components/title";
import TableWithTracks from "@/components/tracks/table-with-tracks";
import { getAllTracks } from "@/lib/db/queries";
import React from "react";

export default async function TracksPage() {
  const tracks = await getAllTracks();

  return (
    <section className="grid h-full grid-rows-[auto,minmax(0,1fr)]">
      <Title title="Your tracks" />
      <TableWithTracks tracks={tracks} />
    </section>
  );
}
