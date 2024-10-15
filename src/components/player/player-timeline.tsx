"use client";

import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/use-player";
import formatDuration from "@/utils/format-duration";

export default function PlayerTimeline() {
  const { currentTime, duration, audioRef, setCurrentTime } = usePlayer();

  const handleTimelineChange = (value: number[]) => {
    if (audioRef.current) {
      const newTime = value[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="flex w-full items-center gap-4 text-xs">
      <span className="w-10 text-right text-muted-foreground">
        {formatDuration(currentTime)}
      </span>
      <Slider
        value={[currentTime]}
        step={1}
        max={duration}
        className="w-full"
        onValueChange={handleTimelineChange}
      />
      <span className="w-10 text-muted-foreground">
        {formatDuration(duration)}
      </span>
    </div>
  );
}
