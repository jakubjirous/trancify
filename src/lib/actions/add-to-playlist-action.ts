"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export default async function addToPlaylistAction(
  playlistId: string,
  trackId: string,
) {
  const existingEntry = await prisma.tracksInPlaylists.findFirst({
    where: {
      playlistId,
      trackId,
    },
  });

  if (existingEntry) {
    return { success: false, message: "Track is already in the playlist" };
  }

  const aggregateResult = await prisma.tracksInPlaylists.aggregate({
    _max: {
      order: true,
    },
    where: {
      playlistId,
    },
  });

  const newOrder = (aggregateResult._max.order ?? 0) + 1;

  await prisma.tracksInPlaylists.create({
    data: {
      trackId,
      playlistId,
      order: newOrder,
    },
  });

  revalidateTag("playlists");

  return { success: true, message: "Track added to playlist successfully" };
}
