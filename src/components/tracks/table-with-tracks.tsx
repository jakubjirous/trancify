import TrackRow from "@/components/tracks/track-row";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Track } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import { Clock } from "lucide-react";
import React from "react";

export default function TableWithTracks({
  tracks,
  headerStyles,
}: { tracks: Track[]; headerStyles?: string }) {
  return (
    <ScrollArea className="h-full">
      <Table>
        <TableHeader className={cn(headerStyles)}>
          <TableRow className="border-foreground/10 border-b">
            <TableHead className="w-10 pl-8">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead className="w-10 pr-8 text-right">
              <Clock className="ml-auto" size={16} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track, index) => (
            <TrackRow key={track.id} track={track} index={index} />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
