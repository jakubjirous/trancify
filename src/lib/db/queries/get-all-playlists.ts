"use server";

import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const getAllPlaylists = unstable_cache(
  async (isLocal: boolean, limit?: number) => {
    return prisma.playlist.findMany({
      take: limit,
      where: {
        isLocal,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["all-playlists"],
  { tags: ["playlists"] },
);

export default getAllPlaylists;
