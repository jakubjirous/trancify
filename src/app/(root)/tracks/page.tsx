import Title from "@/components/title";
import TableWithTracks from "@/components/tracks/table-with-tracks";
import { getAllTracks, searchTracks } from "@/lib/db/queries";
import React, { Suspense } from "react";

const isLocal = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

export default async function TracksPage({
  searchParams,
}: { searchParams: Promise<{ search: string }> }) {
  const { search } = await searchParams;

  const tracks = search
    ? await searchTracks(isLocal, search)
    : await getAllTracks(isLocal);

  return (
    <section className="grid h-full grid-rows-[auto,minmax(0,1fr)]">
      <Title title="Your tracks" />
      <Suspense fallback="">
        <TableWithTracks tracks={tracks} search={search} />
      </Suspense>
    </section>
  );
}
