"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { usePlayer } from "@/hooks/use-player";
import { usePlaylist } from "@/hooks/use-playlist";
import { addToPlaylistAction } from "@/lib/actions";
import { Track } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import formatDuration from "@/utils/format-duration";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Disc3, Pause, Play, Plus } from "lucide-react";
import React, { useState } from "react";

export default function TrackRow({
  track,
  index,
}: { track: Track; index: number }) {
  const { coverUrl, name, artist, album, duration } = track;

  const { currentTrack, playTrack, togglePlayPause, isPlaying } = usePlayer();

  const { playlists } = usePlaylist();

  const isCurrentTrack = currentTrack?.name === name;

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        "group cursor-pointer border-foreground/10 border-b",
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
          <div className="relative size-10">
            <Avatar className="flex size-10 items-center justify-center space-y-0 rounded-md">
              <AvatarImage
                src={coverUrl!}
                alt={`${name} cover`}
                className="object-cover"
              />
              <AvatarFallback className="rounded-md">
                <Disc3 className="size-10" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="whitespace-nowrap font-medium">{name}</div>
            <div className="whitespace-nowrap text-muted-foreground text-sm">
              {artist}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap">{album}</TableCell>
      <TableCell className="pr-8 text-right">
        {formatDuration(duration)}
      </TableCell>
      <TableCell
        className={cn(
          "opacity-0 transition-opacity group-hover:opacity-100",
          dropdownOpen ? "opacity-100" : "",
        )}
      >
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsHorizontalIcon className="size-4" />
              <span className="sr-only">Track options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                if (isCurrentTrack) {
                  togglePlayPause();
                } else {
                  playTrack(track);
                }
              }}
            >
              {isCurrentTrack && isPlaying ? (
                <>
                  <Pause className="mr-2 size-3" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 size-3" />
                  Play
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Plus className="mr-2 size-3" />
                Add to Playlist
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-56">
                {playlists.map((playlist) => (
                  <DropdownMenuItem
                    key={playlist.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToPlaylistAction(playlist.id, track.id);
                    }}
                  >
                    {playlist.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
