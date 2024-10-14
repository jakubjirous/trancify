import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Track } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import formatDuration from "@/utils/format-duration";
import { Clock, Disc3 } from "lucide-react";
import Image from "next/image";
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
            <TableHead className="w-10 pl-6">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead className="w-10 pr-6 text-right">
              <Clock className="ml-auto" size={16} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map(
            ({ id, coverUrl, name, artist, album, duration }, index) => (
              <TableRow
                key={id}
                className="cursor-pointer border-foreground/10 border-b"
              >
                <TableCell className="pl-6 font-medium text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="relative aspect-square h-10">
                      <Avatar className="flex aspect-square h-10 items-center justify-center space-y-0 rounded-md">
                        <AvatarImage src={coverUrl!} alt={`${name} cover`} />
                        <AvatarFallback>
                          <Disc3 className="aspect-square w-10" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-muted-foreground text-sm">
                        {artist}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{album}</TableCell>
                <TableCell className="pr-6 text-right">
                  {formatDuration(duration)}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
