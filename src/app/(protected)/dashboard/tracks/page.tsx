import ROUTES from "@/config/routes";
import { getAllTracks } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TracksPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(ROUTES.signIn);
  }

  const tracks = await getAllTracks();

  return (
    <div>
      <pre>{JSON.stringify(tracks, null, 2)}</pre>
    </div>
  );
}
