"use server";

import { PrismaClient } from "@prisma/client";
import { User } from "@supabase/auth-js";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const getAllPlaylists = unstable_cache(
  async (user: User) => {
    return prisma.playlist.findMany({
      where: {
        userId: user.id,
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
