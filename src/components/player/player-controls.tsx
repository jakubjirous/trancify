"use client";

import PlayerTimeline from "@/components/player/player-timeline";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/use-player";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export default function PlayerControls() {
  let {
    isPlaying,
    togglePlayPause,
    playPreviousTrack,
    playNextTrack,
    currentTrack,
  } = usePlayer();

  return (
    <div className="flex w-full flex-1 flex-col items-center space-y-2 px-4">
      <div className="flex items-center justify-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={playPreviousTrack}
          disabled={!currentTrack}
        >
          <SkipBack className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={togglePlayPause}
          disabled={!currentTrack}
        >
          {isPlaying ? (
            <Pause className="size-6" />
          ) : (
            <Play className="size-6" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={playNextTrack}
          disabled={!currentTrack}
        >
          <SkipForward className="size-5" />
        </Button>
      </div>
      <PlayerTimeline />
    </div>
  );
}
