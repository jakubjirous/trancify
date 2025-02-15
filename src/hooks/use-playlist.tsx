"use client";

import { Playlist, PlaylistWithArtists } from "@/lib/db/types";
import {
  ReactNode,
  createContext,
  use,
  useContext,
  useMemo,
  useOptimistic,
} from "react";

type PlaylistContextType = {
  playlistsWithArtists: PlaylistWithArtists[];
  playlists: Playlist[];
  updatePlaylist: (id: string, updates: Partial<Playlist>) => void;
  deletePlaylist: (id: string) => void;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined,
);

type OptimisticAction =
  | { type: "update"; id: string; updates: Partial<Playlist> }
  | { type: "delete"; id: string };

export function PlaylistProvider({
  children,
  playlistsPromise,
  playlistsWithArtistsPromise,
}: {
  children: ReactNode;
  playlistsPromise: Promise<Playlist[]>;
  playlistsWithArtistsPromise: Promise<PlaylistWithArtists[]>;
}) {
  const initialPlaylists = use(playlistsPromise);

  const playlistsWithArtists = use(playlistsWithArtistsPromise);

  const [playlists, setOptimisticPlaylists] = useOptimistic(
    initialPlaylists,
    (state: Playlist[], action: OptimisticAction) => {
      switch (action.type) {
        case "update":
          return state.map((playlist) =>
            playlist.id === action.id
              ? { ...playlist, ...action.updates }
              : playlist,
          );
        case "delete":
          return state.filter((playlist) => playlist.id !== action.id);
        default:
          return state;
      }
    },
  );

  const updatePlaylist = (id: string, updates: Partial<Playlist>) => {
    setOptimisticPlaylists({ type: "update", id, updates });
  };

  const deletePlaylist = (id: string) => {
    setOptimisticPlaylists({ type: "delete", id });
  };

  const value = useMemo(
    () => ({
      playlists,
      playlistsWithArtists,
      updatePlaylist,
      deletePlaylist,
    }),
    [playlists],
  );

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
}
