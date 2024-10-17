"use server";

import ROUTES from "@/config/routes";
import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export default async function updatePlaylistNameAction(
  playlistId: string,
  name: string,
) {
  await prisma.playlist.update({
    data: {
      name,
    },
    where: {
      id: playlistId,
    },
  });

  revalidateTag("playlists");

  revalidatePath(ROUTES.dashboard, "layout");
}
