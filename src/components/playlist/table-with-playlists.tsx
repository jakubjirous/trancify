"use client";

import PlaylistRow from "@/components/playlist/playlist-row";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody } from "@/components/ui/table";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { PlaylistWithArtists } from "@/lib/db/types";
import React, { RefObject, useEffect, useRef, useState } from "react";

export default function TableWithPlaylists({
  playlists,
}: { playlists: PlaylistWithArtists[] }) {
  const { registerPanelRef, handleKeyNavigation, setActivePanel } =
    useKeyboardNavigation();

  const tableRef = useRef<HTMLTableElement>(null);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    registerPanelRef("sidebar", tableRef as RefObject<HTMLElement>);
  }, [registerPanelRef]);

  return (
    <ScrollArea className="h-[30rem]">
      <Table
        ref={tableRef}
        className="w-full"
        onClick={() => setActivePanel("sidebar")}
      >
        <TableBody>
          {playlists.map((playlist) => (
            <PlaylistRow
              key={playlist.id}
              playlist={playlist}
              isSelected={selectedPlaylistId === playlist.id}
              onSelect={() => setSelectedPlaylistId(playlist.id)}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
