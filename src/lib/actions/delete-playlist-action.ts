"use server";

import getFileTypeFromFilename from "@/utils/get-file-type-from-filename";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function deletePlaylistAction(playlistId: string) {
  await prisma.tracksInPlaylists.deleteMany({
    where: {
      playlistId,
    },
  });

  const deletePlaylist = await prisma.playlist.delete({
    where: {
      id: playlistId,
    },
  });

  const fileType = getFileTypeFromFilename(deletePlaylist.coverUrl!);

  await supabase.storage
    .from("covers")
    .remove([`playlists/${playlistId}.${fileType}`]);

  revalidateTag("playlists");
}
