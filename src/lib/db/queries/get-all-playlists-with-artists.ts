"use server";

import { PrismaClient } from "@prisma/client";
import { User } from "@supabase/auth-js";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

const getAllPlaylistsWithArtists = unstable_cache(
  async (user: User) => {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
      include: {
        tracks: {
          include: {
            track: {
              select: {
                id: true,
                artist: true,
              },
            },
          },
          take: 2,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return playlists.map((playlist) => ({
      ...playlist,
      tracks: playlist.tracks.map(({ track }) => ({
        id: track.id,
        artist: track.artist,
      })),
    }));
  },
  ["all-playlists-with-artists"],
  { tags: ["playlists"] },
);

export default getAllPlaylistsWithArtists;
