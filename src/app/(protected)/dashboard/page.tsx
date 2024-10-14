import PlaylistCards from "@/components/playlist/playlist-cards";
import Title from "@/components/title";
import TableWithTracks from "@/components/tracks/table-with-tracks";
import ROUTES from "@/config/routes";
import { getAllTracks } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const supabase = createClient();

  const tracks = await getAllTracks(5);

  // TODO: remove and use useUser hook instead (Jakub Jirous 2024-10-11 08:36:45)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(ROUTES.signIn);
  }

  return (
    <div className="grid h-full grid-rows-[16rem,minmax(0,1fr)] gap-y-8">
      <section>
        <Title title="Made for you" />
        <PlaylistCards limit={2} onIndex />
      </section>
      <section className="border-t border-t-foreground/10">
        <TableWithTracks tracks={tracks} headerStyles="bg-background" />
      </section>
    </div>
  );
}
