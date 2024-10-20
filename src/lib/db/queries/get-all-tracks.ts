import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const getAllTracks = unstable_cache(
  async (isLocal: boolean, limit?: number) => {
    return prisma.track.findMany({
      where: {
        isLocal,
      },
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
