import ROUTES from "@/config/routes";
import { AlertDialogProvider } from "@/hooks/use-alert-dialog";
import { KeyboardNavigationProvider } from "@/hooks/use-keyboard-navigation";
import { PlayerProvider } from "@/hooks/use-player";
import { PlaylistProvider } from "@/hooks/use-playlist";
import { UserProvider } from "@/hooks/use-user";
import { getAllPlaylists, getAllPlaylistsWithArtists } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedProviders({
  children,
}: { children: ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(ROUTES.signIn);
  }

  const playlistsPromise = getAllPlaylists(user);

  const playlistsWithArtistsPromise = getAllPlaylistsWithArtists(user);

  return (
    <UserProvider user={user}>
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
    </UserProvider>
  );
}
