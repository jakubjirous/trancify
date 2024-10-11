import ROUTES from "@/config/routes";
import { PlaylistProvider } from "@/hooks/use-playlist";
import { UserProvider } from "@/hooks/use-user";
import { getAllPlaylists } from "@/lib/db/queries";
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

  return (
    <UserProvider user={user}>
      <PlaylistProvider playlistsPromise={playlistsPromise}>
        {children}
      </PlaylistProvider>
    </UserProvider>
  );
}
