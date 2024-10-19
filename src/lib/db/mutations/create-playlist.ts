"use server";

import { Playlist } from "@/lib/db/types";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

const createPlaylist = async (
  userId: string,
  playlistId: string,
  name: string,
  coverUrl?: string,
): Promise<Playlist> => {
  let attempt = 1;
  let newName = name;

  while (true) {
    const existingPlaylist = await prisma.playlist.findFirst({
      where: {
        name: newName,
        userId,
      },
    });

    if (!existingPlaylist) {
      break;
    }

    attempt += 1;
    newName = `${name} (${attempt})`;
  }

  const result = await prisma.playlist.create({
    data: {
      id: playlistId,
      name: newName,
      coverUrl: coverUrl ?? "",
      userId,
    },
  });

  revalidateTag("playlists");

  return result;
};

export default createPlaylist;
