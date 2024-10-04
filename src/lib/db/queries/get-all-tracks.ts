import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

export const getAllTracks = unstable_cache(
  async () => {
    return prisma.track.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },
  ["all-tracks"],
  { tags: ["tracks"] },
);
