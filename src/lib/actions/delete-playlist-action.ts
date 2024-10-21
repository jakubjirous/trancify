"use server";

import deleteAllFilesFromPlaylistFolder from "@/lib/actions/delete-all-files-from-playlist-folder";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export default async function deletePlaylistAction(playlistId: string) {
  if (process.env.VERCEL_ENV === "production") {
    return;
  }

  await prisma.tracksInPlaylists.deleteMany({
    where: {
      playlistId,
    },
  });

  await prisma.playlist.delete({
    where: {
      id: playlistId,
    },
  });

  await deleteAllFilesFromPlaylistFolder(playlistId);

  revalidateTag("playlists");
}
