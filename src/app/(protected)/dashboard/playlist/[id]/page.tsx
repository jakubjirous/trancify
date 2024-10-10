import ROUTES from "@/config/routes";
import { getPlaylistWithTracks } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(ROUTES.signIn);
  }

  const playlist = await getPlaylistWithTracks(user, id);

  if (!playlist) {
    notFound();
  }

  return (
    <div>
      <pre>{JSON.stringify(playlist, null, 2)}</pre>
    </div>
  );
}
