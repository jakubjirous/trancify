import { AlertDialogProvider } from "@/hooks/use-alert-dialog";
import { KeyboardNavigationProvider } from "@/hooks/use-keyboard-navigation";
import { PlayerProvider } from "@/hooks/use-player";
import { PlaylistProvider } from "@/hooks/use-playlist";
import { getAllPlaylists, getAllPlaylistsWithArtists } from "@/lib/db/queries";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const isLocal = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

export default function GlobalProviders({ children }: { children: ReactNode }) {
  const playlistsPromise = getAllPlaylists(isLocal);

  const playlistsWithArtistsPromise = getAllPlaylistsWithArtists(isLocal);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PlaylistProvider
        playlistsPromise={playlistsPromise}
        playlistsWithArtistsPromise={playlistsWithArtistsPromise}
      >
        <PlayerProvider>
          <KeyboardNavigationProvider>
            <AlertDialogProvider>{children}</AlertDialogProvider>
          </KeyboardNavigationProvider>
        </PlayerProvider>
      </PlaylistProvider>
    </ThemeProvider>
  );
}
