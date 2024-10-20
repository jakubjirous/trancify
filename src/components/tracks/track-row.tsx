"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import KEY from "@/config/keys";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { usePlayer } from "@/hooks/use-player";
import { usePlaylist } from "@/hooks/use-playlist";
import {
  addToPlaylistAction,
  deleteTrackFromPlaylistAction,
} from "@/lib/actions";
import { PlaylistWithTracks, Track } from "@/lib/db/types";
import { cn } from "@/utils/cn";
import formatDuration from "@/utils/format-duration";
import highlightText from "@/utils/highlight-text";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Disc3, Pause, Play, Plus, Trash } from "lucide-react";
import React, { useState } from "react";

export default function TrackRow({
  track,
  playlist,
  index,
  onSelect,
  isSelected,
  search,
}: {
  track: Track;
  playlist?: PlaylistWithTracks;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  search?: string;
}) {
  const { id, coverUrl, name, artist, album, duration } = track;

  const { currentTrack, playTrack, togglePlayPause, isPlaying } = usePlayer();

  const { playlists } = usePlaylist();

  const { setActivePanel, handleKeyNavigation } = useKeyboardNavigation();

  const { openDialog } = useAlertDialog();

  const [isFocused, setIsFocused] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isCurrentTrack = currentTrack?.name === name;

  const onClickTableRow = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePanel("tracklist");
    onSelect();
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  const onKeyDownTableRow = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === KEY.Enter || e.key === KEY.Space) {
      e.preventDefault();
      onSelect();
      isCurrentTrack ? togglePlayPause() : playTrack(track);
    } else {
      handleKeyNavigation(e, "tracklist");
    }
  };

  return (
    <TableRow
      tabIndex={0}
      onClick={onClickTableRow}
      onKeyDown={onKeyDownTableRow}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "group relative cursor-pointer border-muted border-b",
        "select-none outline-none",
        isCurrentTrack ? "bg-primary/10 dark:bg-primary/30" : "",
        isSelected || isFocused ? "border-b-transparent" : "",
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
            <div className="whitespace-nowrap font-medium">
              {highlightText(name, search)}
            </div>
            <div className="whitespace-nowrap text-muted-foreground text-sm">
              {highlightText(artist, search)}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {highlightText(album ?? "", search)}
      </TableCell>
      <TableCell className="pr-8 text-right">
        {formatDuration(duration)}
      </TableCell>
      <TableCell
        className={cn(
          "opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100",
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
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuGroup>
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
            </DropdownMenuGroup>
            {playlist && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    openDialog({
                      title: "Delete track from Playlist?",
                      description: (
                        <>
                          This will delete{" "}
                          <strong>
                            {track.artist} – {track.name}
                          </strong>{" "}
                          from <strong>{playlist.name}</strong> playlist.
                        </>
                      ),
                      cancelLabel: "Cancel",
                      actionLabel: "Delete",
                      onAction: () =>
                        deleteTrackFromPlaylistAction(playlist.id, id),
                    });
                  }}
                >
                  <Trash className="mr-2 size-3" />
                  Delete from Playlist
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      {(isSelected || isFocused) && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 border",
            isFocused ? "border-primary" : "",
          )}
        />
      )}
    </TableRow>
  );
}
