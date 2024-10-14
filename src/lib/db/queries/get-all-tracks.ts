import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const getAllTracks = unstable_cache(
  async (limit?: number) => {
    return prisma.track.findMany({
      take: limit,
      orderBy: {
        name: "asc",
      },
    });
  },
  ["all-tracks"],
  { tags: ["tracks"] },
);

export default getAllTracks;
