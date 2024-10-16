"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export default async function deleteTrackFromPlaylistAction(
  playlistId: string,
  trackId: string,
) {
  await prisma.tracksInPlaylists.deleteMany({
    where: {
      playlistId,
      trackId,
    },
  });

  revalidateTag("playlists");
}
