import PagePlaylists from "@/components/playlist/page-playlists";
import ROUTES from "@/config/routes";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PlaylistsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(ROUTES.signIn);
  }

  return (
    <div>
      <PagePlaylists />
    </div>
  );
}
