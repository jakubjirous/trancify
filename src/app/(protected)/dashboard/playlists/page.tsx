import PlaylistCards from "@/components/playlist/playlist-cards";
import Title from "@/components/title";
import React from "react";

export default async function PlaylistsPage() {
  return (
    <div className="grid h-full grid-rows-1">
      <section>
        <Title title="Your playlists" />
        <PlaylistCards />
      </section>
    </div>
  );
}
