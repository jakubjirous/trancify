"use client";

import { Track } from "@/lib/db/types";
import {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PlayerContextType = {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentTime: number;
  duration: number;
  togglePlayPause: () => void;
  playTrack: (track: Track) => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
  updateTrack: (track: Track) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setPlaylist: (tracks: Track[]) => void;
  audioRef: RefObject<HTMLAudioElement | null>;
  volume: number;
  isMuted: boolean;
  updateVolume: (value: number[]) => void;
  toggleMute: () => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [playlist, setPlaylist] = useState<Track[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [volume, setVolume] = useState(100);

  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.play();
    }
  }, []);

  const playNextTrack = useCallback(() => {
    if (currentTrack && playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        (track) => track.id === currentTrack.id,
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      playTrack(playlist[nextIndex]);
    }
  }, [currentTrack, playlist, playTrack]);

  const playPreviousTrack = useCallback(() => {
    if (currentTrack && playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        (track) => track.id === currentTrack.id,
      );
      const previousIndex =
        (currentIndex - 1 + playlist.length) % playlist.length;
      playTrack(playlist[previousIndex]);
    }
  }, [currentTrack, playlist, playTrack]);

  const updateTrack = useCallback(
    (track: Track) => {
      setCurrentTrack((prevState) =>
        prevState ? { ...prevState, ...track } : null,
      );
    },
    [currentTrack, setCurrentTrack],
  );

  const updateVolume = useCallback(
    (value: number[]) => {
      if (audioRef.current) {
        const newVolume = value[0];
        audioRef.current.volume = newVolume / 100;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
      }
    },
    [audioRef, setVolume, setIsMuted],
  );

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0;
        setIsMuted(false);
      } else {
        audioRef.current.volume = volume / 100;
        setIsMuted(true);
      }
    }
  }, [audioRef, isMuted, setIsMuted]);

  const increaseVolume = useCallback(() => {
    setVolume((prevVolume) => {
      const newVolume = Math.min(prevVolume + 10, 100);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
        setIsMuted(false);
      }
      return newVolume;
    });
  }, [audioRef, setVolume, setIsMuted]);

  const decreaseVolume = useCallback(() => {
    setVolume((prevVolume) => {
      const newVolume = Math.max(prevVolume - 10, 0);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
        setIsMuted(false);
      }
      return newVolume;
    });
  }, [audioRef, setVolume, setIsMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [audioRef, isMuted, volume]);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        togglePlayPause,
        playTrack,
        playNextTrack,
        playPreviousTrack,
        updateTrack,
        setCurrentTime,
        setDuration,
        setPlaylist,
        audioRef,
        volume,
        isMuted,
        updateVolume,
        toggleMute,
        increaseVolume,
        decreaseVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
