"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/use-player";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

export default function PlayerVolume() {
  const { audioRef } = usePlayer();

  const [volume, setVolume] = useState(100);

  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0];
      audioRef.current.volume = newVolume / 100;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, audioRef]);

  return (
    <div className="flex items-center justify-end space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          toggleMute();
        }}
      >
        {isMuted ? (
          <VolumeX className="size-5 text-muted-foreground" />
        ) : volume > 0 && volume <= 50 ? (
          <Volume1 className="size-5 text-muted-foreground" />
        ) : (
          <Volume2 className="size-5 text-muted-foreground" />
        )}
      </Button>

      <Slider
        value={[volume]}
        step={1}
        max={100}
        className="w-24"
        onValueChange={handleVolumeChange}
      />
    </div>
  );
}
