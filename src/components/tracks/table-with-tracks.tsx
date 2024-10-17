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
import { usePlayer } from "@/hooks/use-player";
import { PlaylistWithTracks, Track } from "@/lib/db/types";
import { Clock } from "lucide-react";
import React, { useEffect } from "react";

export default function TableWithTracks({
  tracks,
  playlist,
}: {
  tracks: Track[];
  playlist?: PlaylistWithTracks;
}) {
  const { setPlaylist } = usePlayer();

  useEffect(() => {
    setPlaylist(tracks);
  }, [tracks, setPlaylist]);

  return (
    <ScrollArea className="h-full">
      <Table className="w-full">
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
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
