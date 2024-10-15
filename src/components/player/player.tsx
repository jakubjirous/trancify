"use client";

import PlayerControls from "@/components/player/player-controls";
import PlayerVolume from "@/components/player/player-volume";
import TrackInfo from "@/components/player/track-info";
import { usePlayer } from "@/hooks/use-player";
import { useEffect } from "react";

export default function Player() {
  const {
    currentTrack,
    audioRef,
    setCurrentTime,
    setDuration,
    playPreviousTrack,
    playNextTrack,
    togglePlayPause,
  } = usePlayer();

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [audioRef, setCurrentTime, setDuration]);

  useEffect(() => {
    if ("mediaSession" in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.name,
        artist: currentTrack.artist,
        album: currentTrack.album || undefined,
        artwork: [
          { src: currentTrack.coverUrl!, sizes: "512x512", type: "image/jpeg" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current?.play();
        togglePlayPause();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.pause();
        togglePlayPause();
      });

      navigator.mediaSession.setActionHandler(
        "previoustrack",
        playPreviousTrack,
      );

      navigator.mediaSession.setActionHandler("nexttrack", playNextTrack);

      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (audioRef.current && details.seekTime !== undefined) {
          audioRef.current.currentTime = details.seekTime;
          setCurrentTime(details.seekTime);
        }
      });

      const updatePositionState = () => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
          try {
            navigator.mediaSession.setPositionState({
              duration: audioRef.current.duration,
              playbackRate: audioRef.current.playbackRate,
              position: audioRef.current.currentTime,
            });
          } catch (error) {
            console.error("Error updating position state:", error);
          }
        }
      };

      const handleLoadedMetadata = () => {
        updatePositionState();
      };

      audioRef.current?.addEventListener("timeupdate", updatePositionState);

      audioRef.current?.addEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );

      return () => {
        audioRef.current?.removeEventListener(
          "timeupdate",
          updatePositionState,
        );
        audioRef.current?.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.setActionHandler("previoustrack", null);
        navigator.mediaSession.setActionHandler("nexttrack", null);
        navigator.mediaSession.setActionHandler("seekto", null);
      };
    }
  }, [
    currentTrack,
    playPreviousTrack,
    playNextTrack,
    togglePlayPause,
    audioRef,
    setCurrentTime,
  ]);

  return (
    <footer className="h-[8rem] w-full border-t border-t-foreground/10 px-8 py-4">
      <audio ref={audioRef} />
      <div className="grid h-full w-full grid-cols-[1fr,2fr,1fr] items-center justify-center gap-4">
        <TrackInfo />
        <PlayerControls />
        <PlayerVolume />
      </div>
    </footer>
  );
}
