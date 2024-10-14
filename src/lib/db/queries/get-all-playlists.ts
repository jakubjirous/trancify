"use server";

import { PrismaClient } from "@prisma/client";
import { User } from "@supabase/auth-js";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const getAllPlaylists = unstable_cache(
  async (user: User, limit?: number) => {
    return prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["all-playlists"],
  { tags: ["playlists"] },
);

export default getAllPlaylists;
