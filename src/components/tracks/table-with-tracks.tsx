"use client";

import TrackRow from "@/components/tracks/track-row";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { usePlayer } from "@/hooks/use-player";
import { PlaylistWithTracks, Track } from "@/lib/db/types";
import { Clock } from "lucide-react";
import React, { RefObject, useEffect, useRef, useState } from "react";

export default function TableWithTracks({
  tracks,
  playlist,
  search,
}: {
  tracks: Track[];
  playlist?: PlaylistWithTracks;
  search?: string;
}) {
  const { setPlaylist } = usePlayer();

  const { registerPanelRef, handleKeyNavigation, setActivePanel } =
    useKeyboardNavigation();

  const tableRef = useRef<HTMLTableElement>(null);

  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  useEffect(() => {
    setPlaylist(tracks);
  }, [tracks, setPlaylist]);

  useEffect(() => {
    registerPanelRef("tracklist", tableRef as RefObject<HTMLElement>);
  }, [registerPanelRef]);

  return (
    <ScrollArea className="h-full">
      <Table
        ref={tableRef}
        className="w-full"
        onClick={() => setActivePanel("tracklist")}
      >
        <TableHeader className="bg-background/50 backdrop-blur-md">
          <TableRow className="border-muted border-b">
            <TableHead className="w-10 pl-8">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead className="w-10 pr-8 text-right">
              <Clock className="ml-auto size-4" />
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              index={index}
              playlist={playlist}
              isSelected={selectedTrackId === track.id}
              onSelect={() => setSelectedTrackId(track.id)}
              search={search}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
