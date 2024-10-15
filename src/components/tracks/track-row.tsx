"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { usePlayer } from "@/hooks/use-player";
import { Track } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import formatDuration from "@/utils/format-duration";
import { Disc3 } from "lucide-react";
import React from "react";

export default function TrackRow({
  track,
  index,
}: { track: Track; index: number }) {
  const { coverUrl, name, artist, album, duration } = track;

  const { currentTrack, playTrack, togglePlayPause, isPlaying } = usePlayer();

  const isCurrentTrack = currentTrack?.name === name;

  function onClickTrackRow(e: React.MouseEvent) {
    e.preventDefault();
    // setActivePanel('tracklist');
    // onSelect();
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  }

  return (
    <TableRow
      onClick={onClickTrackRow}
      className={cn(
        "cursor-pointer border-foreground/10 border-b",
        isCurrentTrack ? "bg-foreground/10" : "",
      )}
    >
      <TableCell className="w-16 pl-8 font-medium text-muted-foreground">
        {isCurrentTrack && isPlaying ? (
          <div className="-ml-[6px] flex h-4 items-end gap-0.5">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="w-0.5 animate-wave-bar rounded-md bg-muted-foreground"
                style={{
                  animationDelay: `${index * 0.25}s`,
                }}
              />
            ))}
          </div>
        ) : (
          <>{index + 1}</>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-10">
            <Avatar className="flex aspect-square w-10 items-center justify-center space-y-0 rounded-md">
              <AvatarImage
                src={coverUrl!}
                alt={`${name} cover`}
                className="object-cover"
              />
              <AvatarFallback className="rounded-md">
                <Disc3 className="aspect-square w-10" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-muted-foreground text-sm">{artist}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{album}</TableCell>
      <TableCell className="pr-8 text-right">
        {formatDuration(duration)}
      </TableCell>
    </TableRow>
  );
}
