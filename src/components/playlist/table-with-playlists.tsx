"use client";

import PlaylistRow from "@/components/playlist/playlist-row";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody } from "@/components/ui/table";
import { PlaylistWithArtists } from "@/lib/db/types";
import React from "react";

export default function TableWithPlaylists({
  playlists,
}: { playlists: PlaylistWithArtists[] }) {
  return (
    <ScrollArea className="h-[30rem]">
      <Table className="w-full">
        <TableBody>
          {playlists.map((playlist) => (
            <PlaylistRow key={playlist.id} playlist={playlist} />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
