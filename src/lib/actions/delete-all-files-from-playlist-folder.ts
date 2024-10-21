import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function deleteAllFilesFromPlaylistFolder(
  playlistId: string,
) {
  const { data: allFiles } = await supabase.storage
    .from("covers")
    .list(`playlists/${playlistId}`);

  const filesToDelete = allFiles
    ? allFiles.map((file) => `playlists/${playlistId}/${file.name}`)
    : [];

  await supabase.storage.from("covers").remove(filesToDelete);
}
