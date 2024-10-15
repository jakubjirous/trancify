"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export default async function deletePlaylistAction(playlistId: string) {
  await prisma.tracksInPlaylists.deleteMany({
    where: {
      playlistId,
    },
  });

  await prisma.playlist.deleteMany({
    where: {
      id: playlistId,
    },
  });

  revalidateTag("playlists");
}
