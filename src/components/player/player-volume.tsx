"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/use-player";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

export default function PlayerVolume() {
  const { toggleMute, isMuted, volume, updateVolume } = usePlayer();

  const [uiVolume, setUIVolume] = useState(volume);

  useEffect(() => {
    setUIVolume(isMuted ? 0 : volume);
  }, [isMuted]);

  useEffect(() => {
    setUIVolume(volume);
  }, [volume]);

  return (
    <div className="flex items-center justify-end space-x-4">
      <Button variant="ghost" size="icon" onClick={toggleMute}>
        {isMuted || volume === 0 ? (
          <VolumeX className="size-5 text-muted-foreground" />
        ) : volume > 0 && volume <= 50 ? (
          <Volume1 className="size-5 text-muted-foreground" />
        ) : (
          <Volume2 className="size-5 text-muted-foreground" />
        )}
      </Button>

      <Slider
        value={[uiVolume]}
        step={1}
        max={100}
        className="hidden w-24 md:flex"
        onValueChange={updateVolume}
      />
    </div>
  );
}
