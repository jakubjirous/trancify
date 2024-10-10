import ROUTES from "@/config/routes";
import { getAllTracks } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const tracks = await getAllTracks();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(ROUTES.signIn);
  }

  return (
    <div className="flex flex-1 flex-col gap-12 overflow-auto">
      <div className="flex flex-col items-start gap-2">
        <h1>User</h1>
        <pre className="overflow-auto rounded border p-3 font-mono text-xs">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h1>Tracks</h1>
        <pre className=" overflow-auto rounded border p-3 font-mono text-xs">
          {JSON.stringify(tracks, null, 2)}
        </pre>
      </div>
    </div>
  );
}
