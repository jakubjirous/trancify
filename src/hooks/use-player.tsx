"use client";

import { Track } from "@/lib/db/types";
import {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
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
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setPlaylist: (tracks: Track[]) => void;

  audioRef: RefObject<HTMLAudioElement>;

  // activePanel: Panel;
  // setActivePanel: (panel: Panel) => void;
  // registerPanelRef: (panel: Panel, ref: React.RefObject<HTMLElement>) => void;
  //
  // handleKeyNavigation: (e: React.KeyboardEvent, panel: Panel) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [playlist, setPlaylist] = useState<Track[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

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

  const playTrack = useCallback(
    (track: Track) => {
      setCurrentTrack(track);
      setIsPlaying(true);
      setCurrentTime(0);

      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.play();
      }
      // setActivePanel("tracklist");
    },
    [], // [setActivePanel],
  );

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
        setCurrentTime,
        setDuration,
        setPlaylist,
        audioRef,
        // activePanel,
        // setActivePanel,
        // registerPanelRef,
        // handleKeyNavigation,
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
