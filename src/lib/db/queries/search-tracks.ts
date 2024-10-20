"use server";

import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const searchTracks = unstable_cache(
  async (isLocal: boolean, searchTerm: string) => {
    return prisma.track.findMany({
      where: {
        isLocal,
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            artist: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            album: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        name: "asc",
      },
    });
  },
  ["search-tracks"],
  { tags: ["tracks"] },
);

export default searchTracks;
